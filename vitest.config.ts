import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "vitest-setup.ts",
    exclude: [...configDefaults.exclude, "**/shared.spec.{ts,tsx}"],
    coverage: {
      all: true,
      include: ["src/**/*.{ts,tsx,js,jsx}", "__tests__/**/*.{ts,tsx,js,jsx}"],
      exclude: [
        "src/**/*.spec.{ts,tsx}",
        "src/**/index.{ts,tsx}",
        "src/**/*.types.{ts,tsx}",
        "src/**/*.types.d.{ts,tsx}",
        "src/**/*.mock.{ts,tsx}",
        "src/lib/icons/*",
        // exclude files that require E2E testing
        "src/lib/styles/**/*",
        "src/pages/_app.tsx",
        "src/pages/_document.tsx",
        "src/pages/api/**/*",
      ],
      lines: 80,
      statements: 80,
      functions: 80,
      branches: 80,
    },
  },
});
