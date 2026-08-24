import { createElement } from "react";
import {
  Building2,
  Dumbbell,
  Fan,
  HardHat,
  Scale,
  ShoppingBag,
  Smile,
  Stethoscope,
  Utensils,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  wrench: Wrench,
  fan: Fan,
  smile: Smile,
  scale: Scale,
  building: Building2,
  utensils: Utensils,
  dumbbell: Dumbbell,
  "hard-hat": HardHat,
  "shopping-bag": ShoppingBag,
};

/** Looks the glyph up inside a stable component, so no component type is
 *  created during render. */
export function IndustryIcon({
  name,
  className,
  strokeWidth,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  return createElement(icons[name] ?? Building2, { className, strokeWidth });
}
