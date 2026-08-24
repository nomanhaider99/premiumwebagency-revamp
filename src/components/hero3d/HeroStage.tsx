"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import CapabilityHub from "@/components/CapabilityHub";

/**
 * Mounts the agent scene on the client only, and falls back to the flat
 * capability hub anywhere WebGL is unavailable or the canvas fails to start —
 * so the hero is never left empty.
 *
 * The scene is a full-bleed background layer: it sizes and offsets itself
 * against the viewport, which is why it takes no layout of its own here.
 */

const AiAgentScene = dynamic(
  () => import("@/components/hero3d/AiAgentScene").then((m) => m.AiAgentScene),
  { ssr: false }
);

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-end">
          <CapabilityHub className="mr-[6%] max-w-[26rem] opacity-70" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default function HeroStage({ className = "" }: { className?: string }) {
  return (
    <SceneBoundary>
      <AiAgentScene className={className} />
    </SceneBoundary>
  );
}
