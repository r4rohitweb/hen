from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
packing = (root / '.reference/legacy/care-story.js').read_text(encoding='utf-8')
packing = packing.replace("'./node_modules/three/build/three.module.js'", "'three'")
packing = packing.replace("function mountPackingStory() {\n  const section = document.querySelector('#care');", "export function mountPackingStory(section) {")
packing = packing[:packing.index("\nif(document.readyState===")]
packing = packing.replace("  if(import.meta.hot) import.meta.hot.dispose(dispose);", "  return dispose;")
(root / 'src/animations/packing.js').write_text(packing, encoding='utf-8')

shop = root / 'src/animations/shopAndCare.js'
shop.write_text(shop.read_text(encoding='utf-8').replace('detail:{p,colour}', 'detail:{p}'), encoding='utf-8')

original = (root / '.reference/pre-react.html').read_text(encoding='utf-8')
head = original[:original.index('<body>')]
head = re.sub(r'  <link rel="stylesheet" href="(?!assets/fonts/)[^"]+">\n', '', head)
head = head.replace('  <script src="assets/runtime/site-runtime.js" defer vite-ignore></script>', '  <link rel="stylesheet" href="assets/runtime/site-runtime.css" vite-ignore>\n  <script src="assets/runtime/site-runtime.js" defer vite-ignore></script>')
(root / 'index.html').write_text(head + '<body>\n  <div id="root"></div>\n  <noscript>Please enable JavaScript to explore Yolk &amp; Co.</noscript>\n</body>\n</html>\n', encoding='utf-8')
