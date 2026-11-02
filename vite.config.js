import { defineConfig } from 'vite';
import { readFileSync, readdirSync } from 'node:fs';

const runtimePath = 'assets/runtime/site-runtime.js';

export default defineConfig({
  base: './',
  esbuild: { jsx: 'automatic' },
  plugins: [
    {
      name: 'source-scripts-in-development',
      apply: 'serve',
      transformIndexHtml(html) {
        return html.replace('  <link rel="stylesheet" href="assets/runtime/site-runtime.css" vite-ignore>\n', '')
          .replace(`<script src="${runtimePath}" defer vite-ignore></script>`, '<script type="module" src="src/main.jsx"></script>');
      },
    },
    {
      name: 'include-file-compatible-runtime',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          // A local file has an opaque origin. Stylesheets must load without a
          // cross-origin fetch so the built copy can also be opened directly.
          return html.replace(/<link\b[^>]*>/g, tag => /rel="stylesheet"/.test(tag)
            ? tag.replace(/\s+crossorigin(?:="[^"]*")?/g, '')
            : tag);
        },
      },
      generateBundle() {
        for (const fileName of [runtimePath, 'assets/runtime/site-runtime.css']) {
          this.emitFile({type:'asset',fileName,source:readFileSync(new URL(fileName,import.meta.url))});
        }
        // JSX uses the same relative image URLs as the direct-file version.
        const assetsRoot = new URL('./assets/', import.meta.url);
        for (const file of readdirSync(assetsRoot, {recursive:true})) {
          const relative = file.replaceAll('\\', '/');
          if (!relative.startsWith('runtime/') && /\.(png|jpe?g|webp|svg|gif|avif|mp4)$/i.test(relative)) {
            this.emitFile({type:'asset',fileName:`assets/${relative}`,source:readFileSync(new URL(relative,assetsRoot))});
          }
        }
      },
    },
  ],
});
