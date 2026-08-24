import { createElement } from "react";
import {
  Palette,
  Code2,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Megaphone,
  Search,
  LifeBuoy,
  BrainCircuit,
  Blocks,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  design: Palette,
  development: Code2,
  ecommerce: ShoppingCart,
  mobile: Smartphone,
  branding: Sparkles,
  marketing: Megaphone,
  seo: Search,
  support: LifeBuoy,
  ai: BrainCircuit,
  blockchain: Blocks,
};

export function getServiceIcon(id: string): LucideIcon {
  return serviceIcons[id] ?? Sparkles;
}

/**
 * Renders a service's glyph without hoisting a component out of the map at
 * render time — looking the icon up inside a stable component keeps React
 * from treating each lookup as a brand new component type.
 */
export function ServiceIcon({
  id,
  className,
  strokeWidth,
}: {
  id: string;
  className?: string;
  strokeWidth?: number;
}) {
  // createElement, not JSX: the glyph type is looked up at render time, and
  // JSX on a local variable reads as a freshly declared component type.
  return createElement(getServiceIcon(id), { className, strokeWidth });
}
