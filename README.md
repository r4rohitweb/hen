# Yolk & Co.

Open `index.html` directly, serve this folder with XAMPP, or run `npm run dev` for development.

The direct-file entry uses the generated classic script at `assets/runtime/site-runtime.js`, so animations do not depend on browser support for loading ES modules from local files. Vite development uses the original source modules.

After changing JavaScript sources, run `npm run build:runtime` to refresh the direct-file version. `npm run build` refreshes that runtime automatically and creates the complete production site in `dist/`.
