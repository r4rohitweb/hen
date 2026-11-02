// Own browser resources used by the scroll scenes. Disposing a scope also
// restores the authored DOM for React StrictMode's setup/cleanup/setup cycle.
export function createAnimationScope(root) {
  let active = true;
  const disposers = [];
  const frames = new Set();
  const attributes = ['style', 'class', 'aria-hidden', 'aria-current', 'aria-valuenow', 'fill', 'viewBox', 'x', 'y', 'rx', 'ry', 'opacity', 'data-care-filled', 'data-care-closing', 'data-care-sealing'];
  const snapshots = [root, ...root.querySelectorAll('*')].map(element => ({
    element, values: attributes.map(name => [name, element.getAttribute(name)]),
  }));
  const bodyClasses = ['egg-journey', 'motion-ready'].map(name => [name, document.body.classList.contains(name)]);
  const guard = callback => (...args) => active ? callback(...args) : undefined;

  return {
    guard,
    defer(dispose) {
      if (active) disposers.push(dispose);
      else dispose();
    },
    on(target, type, callback, options) {
      const listener = guard(callback);
      target.addEventListener(type, listener, options);
      disposers.push(() => target.removeEventListener(type, listener, options));
    },
    requestAnimationFrame(callback) {
      if (!active) return 0;
      const id = window.requestAnimationFrame(time => {
        frames.delete(id);
        if (active) callback(time);
      });
      frames.add(id);
      return id;
    },
    ResizeObserver: function ScopedResizeObserver(callback) {
      const observer = new window.ResizeObserver(guard(callback));
      disposers.push(() => observer.disconnect());
      return observer;
    },
    IntersectionObserver: function ScopedIntersectionObserver(callback, options) {
      const observer = new window.IntersectionObserver(guard(callback), options);
      disposers.push(() => observer.disconnect());
      return observer;
    },
    own(node) {
      disposers.push(() => node.remove());
      return node;
    },
    contents(element) {
      const children = [...element.childNodes];
      disposers.push(() => element.replaceChildren(...children));
    },
    dispose() {
      if (!active) return;
      active = false;
      frames.forEach(id => window.cancelAnimationFrame(id));
      disposers.reverse().forEach(dispose => dispose());
      for (const { element, values } of snapshots) {
        for (const [name, value] of values) {
          if (value === null) element.removeAttribute(name);
          else element.setAttribute(name, value);
        }
      }
      bodyClasses.forEach(([name, present]) => document.body.classList.toggle(name, present));
    },
  };
}
