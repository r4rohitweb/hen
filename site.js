// Bundle the existing scenes as well as the new packing section for production.
import './script.js';
import './bottom.js';
import './cooking.js';
import './mornings.js';
import './escape.js';
import './inside.js';
import './journey.js';

const care = document.querySelector('#care');
let started = false;
function loadPackingStory() {
  if (started) return;
  started = true;
  import('./care-story.js').catch(error => {
    console.warn('Using the illustrated packing story.', error);
  });
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      loadPackingStory();
    }
  }, {rootMargin: '1200px'});
  observer.observe(care);
  if (import.meta.hot) import.meta.hot.dispose(() => observer.disconnect());
} else loadPackingStory();
