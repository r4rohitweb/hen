import { build } from 'vite';
import { fileURLToPath } from 'node:url';

// Keep a classic, self-contained browser entry for XAMPP and direct-file previews.
// The 3D scene still initializes only when its section approaches the viewport.
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
await build({
  configFile: false,
  root: projectRoot,
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: 'assets/runtime',
    emptyOutDir: false,
    copyPublicDir: false,
    minify: true,
    cssMinify: false,
    lib: {
      entry: fileURLToPath(new URL('../src/main.jsx',import.meta.url)),
      name: 'YolkAndCo',
      formats: ['iife'],
      fileName: () => 'site-runtime.js',
      cssFileName: 'site-runtime',
    },
  },
});
