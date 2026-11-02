import { useLayoutEffect } from 'react';
import { createAnimationScope } from '../animations/scope.js';
import initHero from '../animations/hero.js';
import initShopAndCare from '../animations/shopAndCare.js';
import initCooking from '../animations/cooking.js';
import initMornings from '../animations/mornings.js';
import initEscape from '../animations/escape.js';
import initInside from '../animations/inside.js';
import initJourney from '../animations/journey.js';

export function useSceneAnimations(rootRef) {
  useLayoutEffect(() => {
    const scope = createAnimationScope(rootRef.current);
    try {
      [initHero, initShopAndCare, initCooking, initMornings, initEscape, initInside, initJourney]
        .forEach(initialize => initialize(scope));

      const section = rootRef.current.querySelector('#care');
      let started = false;
      function loadPackingStory() {
        if (started) return;
        started = true;
        import('../animations/packing.js')
          .then(scope.guard(({ mountPackingStory }) => {
            const dispose = mountPackingStory(section);
            if (dispose) scope.defer(dispose);
          }))
          .catch(scope.guard(error => console.warn('Using the illustrated packing story.', error)));
      }
      const observer = new scope.IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          loadPackingStory();
        }
      }, { rootMargin: '1200px' });
      observer.observe(section);
    } catch (error) {
      scope.dispose();
      throw error;
    }
    return () => scope.dispose();
  }, [rootRef]);
}
