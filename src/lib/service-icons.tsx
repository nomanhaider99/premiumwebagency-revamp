import {
  Palette,
  Code2,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Megaphone,
  Search,
  LifeBuoy,
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
};

export function getServiceIcon(id: string): LucideIcon {
  return serviceIcons[id] ?? Sparkles;
}
