import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored: pulled in verbatim by `shadcn add @skiper-ui/*`. Linting
    // someone else's generated source only tempts us to edit it, and any
    // edit is lost the next time the component is re-added.
    "src/components/ui/skiper-ui/**",
  ]),
]);

export default eslintConfig;
