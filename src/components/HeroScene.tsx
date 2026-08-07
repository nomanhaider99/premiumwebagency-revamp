"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { gsap } from "@/lib/gsap";

export default function HeroScene({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // lights — key + brand-tinted fill/rim for a glassy, studio-lit look
    scene.add(new THREE.AmbientLight(0x2a6f93, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.PointLight(0x45c8ca, 6, 16);
    fill.position.set(-3, -2, 3);
    scene.add(fill);
    const rim = new THREE.PointLight(0x0099ff, 9, 18);
    rim.position.set(-2, 3, -4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.7, 5);
    const basePositions = Float32Array.from(geometry.attributes.position.array);
    const noise3D = createNoise3D();

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1d5c82"),
      metalness: 0.2,
      roughness: 0.15,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      emissive: new THREE.Color("#0099ff"),
      emissiveIntensity: 0.15,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(0.001);
    group.add(mesh);

    gsap.to(mesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.6,
      ease: "power3.out",
      delay: 0.4,
    });

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const rawY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      const nx = Math.max(-1, Math.min(1, rawX));
      const ny = Math.max(-1, Math.min(1, rawY));
      gsap.to(mesh.rotation, {
        x: ny * 0.25,
        y: nx * 0.35,
        duration: 1.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    const posAttr = geometry.attributes.position;
    const timer = new THREE.Timer();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();

      for (let i = 0; i < posAttr.count; i++) {
        const ix = i * 3;
        const bx = basePositions[ix];
        const by = basePositions[ix + 1];
        const bz = basePositions[ix + 2];
        const n = noise3D(bx * 0.9 + t * 0.22, by * 0.9 + t * 0.22, bz * 0.9);
        const s = 1 + n * 0.16;
        posAttr.setXYZ(i, bx * s, by * s, bz * s);
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      group.rotation.y += 0.0025;

      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      gsap.killTweensOf(mesh.rotation);
      gsap.killTweensOf(mesh.scale);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
