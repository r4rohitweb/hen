import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

const runtimePath = 'assets/runtime/site-runtime.js';

export default defineConfig({
  base: './',
  esbuild: { jsx: 'automatic' },
  plugins: [
    {
      name: 'source-scripts-in-development',
      apply: 'serve',
      transformIndexHtml(html) {
        return html.replace(`<script src="${runtimePath}" defer vite-ignore></script>`, '<script type="module" src="site.js"></script>');
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
        this.emitFile({type:'asset',fileName:runtimePath,source:readFileSync(new URL(runtimePath,import.meta.url))});
      },
    },
  ],
});
