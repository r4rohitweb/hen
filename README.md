# Yolk & Co.

React 19 and Vite, preserving the original artwork, layout, and scroll animations.

Open `index.html` directly, serve this folder with XAMPP, or run `npm run dev` for development. Run `npm run build` for the production site in `dist/`, and `npm run preview` to preview it over HTTP.

The React entry is `src/main.jsx`. `src/App.jsx` owns the selected egg colour, order selection, and farm tour. Page sections and reusable SVG cartons live in `src/components/`. Original styles live in `src/styles/`.

`src/hooks/useSceneAnimations.js` mounts the scroll controllers from `src/animations/` and cleans them up on unmount. The Three.js packing scene initializes as its section approaches the viewport and disposes its WebGL resources on cleanup. The effects also support React Strict Mode in development.

Direct-file loading uses the generated JavaScript and CSS in `assets/runtime/`. After editing sources, run `npm run build:runtime` to refresh that version. `npm run build` does this automatically. Vite development uses the JSX and styles directly.

The pre-conversion source is retained in `.reference/legacy/`; visual comparison captures and browser checks are also in `.reference/`.
