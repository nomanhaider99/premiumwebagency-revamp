"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/*
 * Hero "AI agent" scene.
 *
 * Everything here is built procedurally out of three.js primitives — there is no
 * .glb to fetch, so the scene can never half-load or block the hero on a network
 * round trip. Two layers make up the composition:
 *
 *   1. the agent  — a rounded-cube head with a glass visor, tracking eyes, a
 *                   voice-waveform "mouth" and an antenna, on a collar plinth.
 *   2. the field  — a 200-node neural mesh sphere the agent floats inside, with
 *                   signal pulses that travel along its links, plus tilted
 *                   orbit rings carrying satellites.
 *
 * Palette is the site's own: indigo #6260FF and lavender #E4E4FF over the hero's
 * dark gradient, which shows through because the canvas clears to transparent.
 */

const INDIGO = 0x6260ff;
const LAVENDER = 0xe4e4ff;

/** Actual extent of the composition in world units (the widest orbit ring). */
const COMPOSITION_DIAMETER = 5.24;

/*
 * The scene is a full-bleed hero background, so it is deliberately *not* fitted
 * edge-to-edge — it is sized to a fraction of the shorter visible dimension and
 * pushed off-centre, leaving the headline its own space. Wide screens put the
 * agent right of the copy; narrow ones drop it below the copy, where the old
 * card composition used to sit.
 */
const WIDE_FIT = 0.62;
const NARROW_FIT = 0.84;
/** Breakpoint the offsets switch at — matches Tailwind's `lg`. */
const WIDE_MIN_PX = 1024;

/**
 * Timestamp of the single frame drawn under `prefers-reduced-motion`: far
 * enough in that the voice bars and orbit satellites have spread out, and not
 * on a blink.
 */
const STILL_FRAME_TIME = 1.6;

/** Rounded rectangle outline, used as the profile for every rounded box below. */
function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/**
 * A box with rounded corners *and* soft bevelled edges — three.js has no such
 * primitive in core, so it is extruded from a rounded rect and re-centred on Z
 * (ExtrudeGeometry spans -bevel .. depth+bevel).
 */
function roundedBoxGeometry(w: number, h: number, d: number, r: number, bevel: number) {
  const depth = Math.max(0.001, d - bevel * 2);
  const geo = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 14,
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}

/** Soft radial dot, used both as the point sprite and as fake bloom around lights. */
function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.55)");
    g.addColorStop(0.6, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * A tiny gradient "studio" as an environment map. Without one, the metal shell
 * reads as flat black — metals reflect the environment, and there isn't one.
 */
function makeEnvironment(renderer: THREE.WebGLRenderer) {
  const c = document.createElement("canvas");
  c.width = 32;
  c.height = 128;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, "#d5d4ff");
    g.addColorStop(0.36, "#6260ff");
    g.addColorStop(0.68, "#191840");
    g.addColorStop(1, "#05050c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 128);
  }
  const source = new THREE.CanvasTexture(c);
  source.mapping = THREE.EquirectangularReflectionMapping;
  source.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(source).texture;
  pmrem.dispose();
  source.dispose();
  return env;
}

export function AiAgentScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Old browsers and blocked-WebGL contexts: bail silently and let the CSS
    // glow behind the canvas stand in for the scene.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.environment = makeEnvironment(renderer);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 8.6);

    // Everything hangs off `root` so a single scale call fits the whole
    // composition to whatever box the hero gives us.
    const root = new THREE.Group();
    scene.add(root);

    // Disposables, collected as they're made so teardown is exhaustive.
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];
    const geo = <T extends THREE.BufferGeometry>(g: T) => (geometries.push(g), g);
    const mat = <T extends THREE.Material>(m: T) => (materials.push(m), m);

    const glowTex = makeGlowTexture();
    textures.push(glowTex);

    /** Additive sprite used to fake bloom around anything that "emits". */
    const glow = (color: number, size: number, opacity: number) => {
      const m = mat(
        new THREE.SpriteMaterial({
          map: glowTex,
          color,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      const s = new THREE.Sprite(m);
      s.scale.setScalar(size);
      return s;
    };

    // ---------------------------------------------------------------- lighting
    scene.add(new THREE.AmbientLight(0x9a99ff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(3.5, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(INDIGO, 3.4);
    rim.position.set(-4.5, 1.2, -3);
    scene.add(rim);
    const fill = new THREE.PointLight(LAVENDER, 22, 14, 2);
    fill.position.set(-2.2, -1.6, 3.2);
    scene.add(fill);

    // ------------------------------------------------------------ ambient glow
    const backdrop = glow(INDIGO, 9.5, 0.5);
    backdrop.position.z = -3.4;
    root.add(backdrop);
    const headGlow = glow(INDIGO, 4.6, 0.45);
    headGlow.position.z = -1.1;
    root.add(headGlow);

    // ------------------------------------------------------------- the agent
    const agent = new THREE.Group();
    // Sized up against the neural field so the agent, not the sphere, is the
    // thing the eye lands on first.
    agent.scale.setScalar(1.28);
    root.add(agent);

    const shellMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0x35337a,
        metalness: 0.88,
        roughness: 0.24,
        envMapIntensity: 1.5,
      }),
    );
    const head = new THREE.Mesh(geo(roundedBoxGeometry(1.95, 1.62, 0.98, 0.42, 0.07)), shellMat);
    agent.add(head);

    // Glass visor. Clearcoat + low roughness gives the wet, screen-like sheen
    // that separates the "face" from the metal shell around it.
    const visor = new THREE.Mesh(
      geo(roundedBoxGeometry(1.52, 0.94, 0.14, 0.34, 0.035)),
      mat(
        new THREE.MeshPhysicalMaterial({
          color: 0x0b0a2e,
          metalness: 0.25,
          roughness: 0.07,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          emissive: 0x2b29b4,
          emissiveIntensity: 0.75,
        }),
      ),
    );
    visor.position.set(0, 0.07, 0.5);
    head.add(visor);

    // Eyes are unlit (MeshBasicMaterial) so they read as emitters at any light
    // angle, each backed by an additive halo. Deliberately wider than they are
    // tall — two round pips plus the waveform below reads as a skull.
    const eyeGeo = geo(roundedBoxGeometry(0.34, 0.21, 0.06, 0.1, 0.016));
    const eyeMat = mat(new THREE.MeshBasicMaterial({ color: 0xeceaff }));
    const eyes: THREE.Mesh[] = [];
    const eyeHalos: THREE.Sprite[] = [];
    for (const sign of [-1, 1]) {
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(sign * 0.35, 0.11, 0.58);
      head.add(eye);
      eyes.push(eye);

      const halo = glow(LAVENDER, 1.05, 0.8);
      halo.position.copy(eye.position);
      halo.position.z += 0.02;
      head.add(halo);
      eyeHalos.push(halo);
    }

    // Voice waveform: five bars under the eyes that bounce like a listening
    // indicator. This is what makes the head read as an *agent* rather than a toy.
    const BAR_COUNT = 7;
    const barGeo = geo(roundedBoxGeometry(0.03, 0.1, 0.05, 0.015, 0.007));
    const barMat = mat(new THREE.MeshBasicMaterial({ color: 0x7c7aff }));
    const bars: THREE.Mesh[] = [];
    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set((i - (BAR_COUNT - 1) / 2) * 0.072, -0.3, 0.58);
      head.add(bar);
      bars.push(bar);
    }

    // Scan line sweeping the visor.
    const scanMat = mat(
      new THREE.MeshBasicMaterial({
        color: LAVENDER,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const scan = new THREE.Mesh(geo(new THREE.PlaneGeometry(1.42, 0.035)), scanMat);
    scan.position.set(0, 0.07, 0.585);
    head.add(scan);

    // Antenna + status bulb.
    const antenna = new THREE.Mesh(
      geo(new THREE.CylinderGeometry(0.03, 0.042, 0.34, 12)),
      shellMat,
    );
    antenna.position.set(0, 0.97, 0);
    head.add(antenna);

    const bulbMat = mat(new THREE.MeshBasicMaterial({ color: LAVENDER }));
    const bulb = new THREE.Mesh(geo(new THREE.SphereGeometry(0.1, 20, 16)), bulbMat);
    bulb.position.set(0, 1.2, 0);
    head.add(bulb);
    const bulbHalo = glow(INDIGO, 1.5, 0.9);
    bulbHalo.position.copy(bulb.position);
    head.add(bulbHalo);

    // Side pods with emissive rims.
    const podGeo = geo(new THREE.CylinderGeometry(0.23, 0.23, 0.17, 28));
    const ringMat = mat(
      new THREE.MeshBasicMaterial({
        color: INDIGO,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const podRingGeo = geo(new THREE.TorusGeometry(0.16, 0.022, 10, 32));
    for (const sign of [-1, 1]) {
      const pod = new THREE.Mesh(podGeo, shellMat);
      pod.rotation.z = Math.PI / 2;
      pod.position.set(sign * 1.0, 0.02, 0);
      head.add(pod);

      const podRing = new THREE.Mesh(podRingGeo, ringMat);
      podRing.rotation.y = Math.PI / 2;
      podRing.position.set(sign * 1.09, 0.02, 0);
      head.add(podRing);
    }

    // Collar plinth the head floats above.
    const neck = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.26, 0.34, 0.3, 28)), shellMat);
    neck.position.y = -1.02;
    agent.add(neck);

    const collar = new THREE.Mesh(
      geo(new THREE.CylinderGeometry(0.66, 0.74, 0.12, 40)),
      shellMat,
    );
    collar.position.y = -1.24;
    agent.add(collar);

    const baseRing = new THREE.Mesh(geo(new THREE.TorusGeometry(0.78, 0.014, 10, 64)), ringMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -1.34;
    agent.add(baseRing);

    // Holographic floor disc under the plinth.
    const floorRing = new THREE.Mesh(
      geo(new THREE.TorusGeometry(1.12, 0.012, 10, 80)),
      mat(
        new THREE.MeshBasicMaterial({
          color: LAVENDER,
          transparent: true,
          opacity: 0.28,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = -1.46;
    root.add(floorRing);

    // ------------------------------------------------------- orbit rings
    const orbitGroup = new THREE.Group();
    root.add(orbitGroup);

    const orbitSpecs = [
      { radius: 1.95, tube: 0.009, tilt: [1.15, 0.3, 0] as const, speed: 0.42, color: LAVENDER },
      { radius: 2.62, tube: 0.007, tilt: [-0.85, 0, 0.55] as const, speed: -0.3, color: LAVENDER },
      { radius: 2.28, tube: 0.009, tilt: [1.42, 0.9, 0] as const, speed: 0.56, color: INDIGO },
    ];
    const satellites: { pivot: THREE.Group; sat: THREE.Object3D; radius: number; speed: number; angle: number }[] =
      [];

    for (const spec of orbitSpecs) {
      const pivot = new THREE.Group();
      pivot.rotation.set(spec.tilt[0], spec.tilt[1], spec.tilt[2]);
      orbitGroup.add(pivot);

      const ring = new THREE.Mesh(
        geo(new THREE.TorusGeometry(spec.radius, spec.tube, 8, 128)),
        mat(
          new THREE.MeshBasicMaterial({
            color: spec.color,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        ),
      );
      pivot.add(ring);

      const sat = new THREE.Group();
      const core = new THREE.Mesh(geo(new THREE.SphereGeometry(0.05, 16, 12)), bulbMat);
      sat.add(core, glow(spec.color, 0.85, 0.9));
      pivot.add(sat);

      satellites.push({ pivot, sat, radius: spec.radius, speed: spec.speed, angle: Math.random() * Math.PI * 2 });
    }

    // ------------------------------------------------- neural mesh sphere
    const NODE_COUNT = 250;
    const ORB_RADIUS = 2.5;
    const LINK_DISTANCE = 0.6;
    const MAX_LINKS = 700;

    const orb = new THREE.Group();
    root.add(orb);

    // Fibonacci sphere — even coverage without the pole clustering of a naive
    // lat/long distribution.
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963229728653; // golden angle
      nodes.push(
        new THREE.Vector3(Math.cos(theta) * ringRadius, y, Math.sin(theta) * ringRadius).multiplyScalar(
          ORB_RADIUS,
        ),
      );
    }

    const nodePositions = new Float32Array(NODE_COUNT * 3);
    nodes.forEach((n, i) => {
      nodePositions[i * 3] = n.x;
      nodePositions[i * 3 + 1] = n.y;
      nodePositions[i * 3 + 2] = n.z;
    });
    const nodeGeo = geo(new THREE.BufferGeometry());
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    orb.add(
      new THREE.Points(
        nodeGeo,
        mat(
          new THREE.PointsMaterial({
            size: 0.095,
            map: glowTex,
            color: 0xdad9ff,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
          }),
        ),
      ),
    );

    // Link every node to its close neighbours. O(n²) at 200 nodes is 20k
    // comparisons — a one-off cost at mount, not per frame.
    const allLinks: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i]!.distanceTo(nodes[j]!) < LINK_DISTANCE) allLinks.push([i, j]);
      }
    }
    // If the mesh comes out denser than the budget, thin it by an even stride.
    // Truncating instead would strip links from one pole only — the Fibonacci
    // distribution walks the sphere top to bottom, so `i` is latitude order.
    const stride = Math.ceil(allLinks.length / MAX_LINKS);
    const links = stride > 1 ? allLinks.filter((_, i) => i % stride === 0) : allLinks;

    const linkPositions = new Float32Array(links.length * 6);
    links.forEach(([a, b], i) => {
      const na = nodes[a]!;
      const nb = nodes[b]!;
      linkPositions.set([na.x, na.y, na.z, nb.x, nb.y, nb.z], i * 6);
    });
    const linkGeo = geo(new THREE.BufferGeometry());
    linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPositions, 3));
    const linkMat = mat(
      new THREE.LineBasicMaterial({
        color: 0x8b89ff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    orb.add(new THREE.LineSegments(linkGeo, linkMat));

    // Signal pulses: bright dots that travel a link, then hop to another one.
    // This is the detail that sells "a model thinking" over "a decorative ball".
    const PULSE_COUNT = 14;
    const pulsePositions = new Float32Array(PULSE_COUNT * 3);
    const pulseState = Array.from({ length: PULSE_COUNT }, () => ({
      link: Math.floor(Math.random() * Math.max(1, links.length)),
      t: Math.random(),
      speed: 0.5 + Math.random() * 0.9,
      flip: Math.random() < 0.5,
    }));
    const pulseGeo = geo(new THREE.BufferGeometry());
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
    orb.add(
      new THREE.Points(
        pulseGeo,
        mat(
          new THREE.PointsMaterial({
            size: 0.3,
            map: glowTex,
            color: LAVENDER,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
          }),
        ),
      ),
    );

    // ------------------------------------------------- ambient constellation
    // A second, much wider network that fills the entire hero behind the agent.
    // It is parented to the scene rather than to `root`, so the fit-and-offset
    // that frames the agent leaves it alone: this layer always spans the section.
    //
    // The box is fixed in world units rather than resized to the viewport —
    // scaling a group non-uniformly would stretch every link toward horizontal,
    // and rebuilding the geometry on each resize would cost far more than simply
    // drawing a field wide enough to cover any sane aspect ratio and letting the
    // frustum crop it.
    const AMBIENT_COUNT = 550;
    const AMBIENT_BOX = new THREE.Vector3(26, 16, 6);
    const AMBIENT_LINK_DISTANCE = 1.25;
    const AMBIENT_MAX_LINKS = 700;

    const ambient = new THREE.Group();
    ambient.position.z = -2;
    scene.add(ambient);

    const dust: THREE.Vector3[] = [];
    const dustPositions = new Float32Array(AMBIENT_COUNT * 3);
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const p = new THREE.Vector3(
        (Math.random() - 0.5) * AMBIENT_BOX.x,
        (Math.random() - 0.5) * AMBIENT_BOX.y,
        (Math.random() - 0.5) * AMBIENT_BOX.z,
      );
      dust.push(p);
      dustPositions.set([p.x, p.y, p.z], i * 3);
    }

    const dustGeo = geo(new THREE.BufferGeometry());
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    ambient.add(
      new THREE.Points(
        dustGeo,
        mat(
          new THREE.PointsMaterial({
            size: 0.055,
            map: glowTex,
            color: 0xc4c3ff,
            transparent: true,
            opacity: 0.62,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
          }),
        ),
      ),
    );

    const ambientLinks: [number, number][] = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      for (let j = i + 1; j < AMBIENT_COUNT; j++) {
        if (dust[i]!.distanceTo(dust[j]!) < AMBIENT_LINK_DISTANCE) ambientLinks.push([i, j]);
      }
    }
    const ambientStride = Math.ceil(ambientLinks.length / AMBIENT_MAX_LINKS);
    const keptAmbient =
      ambientStride > 1 ? ambientLinks.filter((_, i) => i % ambientStride === 0) : ambientLinks;

    const ambientLinePositions = new Float32Array(keptAmbient.length * 6);
    keptAmbient.forEach(([a, b], i) => {
      const pa = dust[a]!;
      const pb = dust[b]!;
      ambientLinePositions.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], i * 6);
    });
    const ambientLineGeo = geo(new THREE.BufferGeometry());
    ambientLineGeo.setAttribute("position", new THREE.BufferAttribute(ambientLinePositions, 3));
    ambient.add(
      new THREE.LineSegments(
        ambientLineGeo,
        mat(
          new THREE.LineBasicMaterial({
            color: 0x8b89ff,
            transparent: true,
            opacity: 0.13,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        ),
      ),
    );

    // ------------------------------------------------------------- interaction
    // Tracked against the canvas box but listened for on the window, so the
    // agent keeps looking at the cursor while it's over the headline too.
    const pointer = { x: 0, y: 0 };
    const smoothed = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const ndcX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ndcY = ((e.clientY - r.top) / r.height - 0.5) * 2;
      pointer.x = THREE.MathUtils.clamp(ndcX - focus.x, -1.6, 1.6);
      pointer.y = THREE.MathUtils.clamp(ndcY - focus.y, -1.6, 1.6);
    };

    // ------------------------------------------------------------------ sizing
    // Where the agent sits in normalised device coords, so pointer tracking can
    // measure from the agent rather than from the middle of the hero — without
    // this the head looks "straight ahead" while the cursor is well to its left.
    const focus = { x: 0, y: 0 };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const visibleW = visibleH * camera.aspect;
      const wide = w >= WIDE_MIN_PX;

      root.scale.setScalar(
        THREE.MathUtils.clamp(
          (Math.min(visibleH, visibleW) * (wide ? WIDE_FIT : NARROW_FIT)) / COMPOSITION_DIAMETER,
          0.3,
          1.2,
        ),
      );

      // Wide: right of the copy column. Narrow: below it.
      focus.x = wide ? 0.42 : 0;
      focus.y = wide ? 0.04 : -0.34;
      root.position.x = (focus.x * visibleW) / 2;
      root.position.y = (focus.y * visibleH) / 2;
    };
    resize();

    // ------------------------------------------------------------------- frame
    const clock = new THREE.Clock();
    let blinkAt = 2.4;

    const renderFrame = (t: number, dt: number) => {
      smoothed.x += (pointer.x - smoothed.x) * Math.min(1, dt * 3.5);
      smoothed.y += (pointer.y - smoothed.y) * Math.min(1, dt * 3.5);

      // Idle sway keeps the agent alive on touch devices, where there is no
      // pointer to follow.
      const swayY = Math.sin(t * 0.45) * 0.12;
      const swayX = Math.sin(t * 0.33) * 0.05;

      agent.position.y = Math.sin(t * 0.85) * 0.075;
      head.rotation.y = smoothed.x * 0.42 + swayY;
      head.rotation.x = smoothed.y * 0.24 + swayX;
      head.rotation.z = -smoothed.x * 0.06;
      root.rotation.y = smoothed.x * 0.11;
      root.rotation.x = smoothed.y * 0.07;

      // Eyes track a little further than the head turns.
      const eyeDx = smoothed.x * 0.05;
      const eyeDy = -smoothed.y * 0.035;
      eyes.forEach((eye, i) => {
        const sign = i === 0 ? -1 : 1;
        eye.position.x = sign * 0.34 + eyeDx;
        eye.position.y = 0.09 + eyeDy;
        eyeHalos[i]!.position.x = eye.position.x;
        eyeHalos[i]!.position.y = eye.position.y;
      });

      // Blink: squash to a slit, then schedule the next one 2.4–5.6s out.
      const since = t - blinkAt;
      let lids = 1;
      if (since >= 0 && since < 0.16) {
        lids = Math.abs(Math.cos((since / 0.16) * Math.PI));
      } else if (since >= 0.16) {
        blinkAt = t + 2.4 + Math.random() * 3.2;
      }
      for (const eye of eyes) eye.scale.y = Math.max(0.07, lids);

      // Voice bars.
      // Two detuned sines per bar so neighbours never march in lockstep — an
      // even row of equal bars is what makes a waveform read as a row of teeth.
      bars.forEach((bar, i) => {
        const a = Math.sin(t * 3.1 + i * 1.35);
        const b = Math.sin(t * 1.9 + i * 0.62);
        bar.scale.y = 0.3 + Math.abs(a * 0.65 + b * 0.35) * 1.75;
      });

      // Visor scan sweep, brightest mid-travel.
      const sweep = Math.sin(t * 0.75);
      scan.position.y = 0.07 + sweep * 0.36;
      scanMat.opacity = 0.08 + (1 - Math.abs(sweep)) * 0.24;

      // Antenna bulb pulse.
      const pulse = 0.85 + Math.sin(t * 2.4) * 0.15;
      bulb.scale.setScalar(pulse);
      bulbHalo.scale.setScalar(1.5 * pulse);

      // Rings + satellites.
      orbitGroup.rotation.y = t * 0.07;
      for (const s of satellites) {
        s.angle += s.speed * dt;
        s.sat.position.set(Math.cos(s.angle) * s.radius, Math.sin(s.angle) * s.radius, 0);
      }

      // Ambient field drifts on a slow Lissajous path and leans *against* the
      // cursor, so it parallaxes as the layer furthest from the viewer.
      ambient.position.x = Math.sin(t * 0.06) * 0.5 - smoothed.x * 0.22;
      ambient.position.y = Math.cos(t * 0.05) * 0.35 - smoothed.y * 0.14;
      ambient.rotation.z = t * 0.006;

      // Neural field: slow tumble plus a breathing scale.
      orb.rotation.y = t * 0.035;
      orb.rotation.x = Math.sin(t * 0.12) * 0.16;
      orb.scale.setScalar(1 + Math.sin(t * 0.55) * 0.018);
      linkMat.opacity = 0.26 + Math.sin(t * 0.9) * 0.07;

      // Advance each signal pulse along its link, re-homing it on arrival.
      if (links.length) {
        for (let i = 0; i < PULSE_COUNT; i++) {
          const p = pulseState[i]!;
          p.t += p.speed * dt;
          if (p.t >= 1) {
            p.t = 0;
            p.link = Math.floor(Math.random() * links.length);
            p.speed = 0.5 + Math.random() * 0.9;
            p.flip = Math.random() < 0.5;
          }
          const link = links[p.link]!;
          const from = nodes[p.flip ? link[1] : link[0]]!;
          const to = nodes[p.flip ? link[0] : link[1]]!;
          pulsePositions[i * 3] = from.x + (to.x - from.x) * p.t;
          pulsePositions[i * 3 + 1] = from.y + (to.y - from.y) * p.t;
          pulsePositions[i * 3 + 2] = from.z + (to.z - from.z) * p.t;
        }
        pulseGeo.attributes.position!.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    // A resize only repaints by itself when the loop is running; under reduced
    // motion there is no loop, so the observer has to re-render the still.
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) renderFrame(STILL_FRAME_TIME, 0);
    });
    ro.observe(container);

    if (reduced) {
      // One static, well-composed frame — no loop, no pointer listener.
      renderFrame(STILL_FRAME_TIME, 0);
      return () => {
        ro.disconnect();
        disposeAll();
      };
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Only burn frames while the hero is actually on screen and the tab is
    // focused — this scene sits at the top of the page, so it would otherwise
    // keep rendering behind the entire rest of the site.
    let running = false;
    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      renderFrame(clock.elapsedTime, dt);
    };
    const setRunning = (next: boolean) => {
      if (next === running) return;
      running = next;
      if (next) {
        clock.getDelta(); // drop the paused interval
        renderer.setAnimationLoop(tick);
      } else {
        renderer.setAnimationLoop(null);
      }
    };

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        setRunning(visible && !document.hidden);
      },
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => setRunning(visible && !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    setRunning(true);

    function disposeAll() {
      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
      for (const t of textures) t.dispose();
      scene.environment?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      ro.disconnect();
      disposeAll();
    };
  }, [reduced]);

  return <div ref={containerRef} aria-hidden className={className} />;
}

export default AiAgentScene;
