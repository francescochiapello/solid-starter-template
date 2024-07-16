import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import hexColorTransform from "@lightningtv/vite-hex-transform";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    hexColorTransform({
      include: ["src/**/*.{ts,tsx,js,jsx}"],
    }),
    solidPlugin({
      solid: {
        moduleName: "@lightningtv/solid",
        generate: "universal",
      },
    }),
    legacy({
      targets: ["defaults", "Chrome >= 49"],
      // additionalLegacyPolyfills: ["whatwg-fetch", "es6-proxy-polyfill"],
    }),
  ],
  resolve: {
    alias: {
      theme: "@lightningjs/l3-ui-theme-base",
      "@lightningjs/solid": "@lightningtv/solid",
      "@lightningjs/solid-primitives": "@lightningtv/solid",
    },
    dedupe: ["solid-js", "@lightningtv/solid", "@lightningjs/renderer"],
  },
  server: {
    hmr: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  test: {
    browser: {
      enabled: true,
      headless: false,
      provider: "playwright",
      name: "webkit",
    },
    testTransformMode: { web: ["/.[jt]sx?$/"] },
    globals: true,
  },
});
