import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            { char: "'", alternatives: ["&apos;"] },
            { char: '"', alternatives: ["&quot;"] },
          ],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".contentlayer/**",
    // Local-only folders (gitignored): the Claude Design bundle and project docs
    "design/**",
    "docs/**",
  ]),
]);

export default eslintConfig;
