"""One-time, local migration preserving the site's authored SVG illustrations."""
from html.parser import HTMLParser
from pathlib import Path
import html
import json
import re

root = Path(__file__).resolve().parent.parent
legacy = root / '.reference' / 'legacy'
source = (root / '.reference' / 'pre-react.html').read_text(encoding='utf-8')
components = root / 'src' / 'components'
animations = root / 'src' / 'animations'
styles = root / 'src' / 'styles'
for directory in (components, animations, styles):
    directory.mkdir(parents=True, exist_ok=True)

names = {'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex',
         'viewbox': 'viewBox', 'preserveaspectratio': 'preserveAspectRatio',
         'crossorigin': 'crossOrigin'}
voids = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

def attr_name(name):
    if name.startswith(('aria-', 'data-')):
        return name
    return names.get(name.lower(), re.sub(r'[-:]([a-z])', lambda m: m[1].upper(), name))

def value_expr(value):
    if '${' in value:
        return '`' + value + '`'
    return json.dumps(value, ensure_ascii=False)

class JSX(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
    def tag(self, tag, closed=False):
        raw = self.get_starttag_text()
        original = re.match(r'<([^\s/>]+)', raw)[1]
        attrs = []
        for match in re.finditer(r'([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|\x27([^\x27]*)\x27))?', raw[len(original)+1:].rstrip('/>')):
            name, double, single = match.groups()
            value = double if double is not None else single
            name = attr_name(name)
            if value is None:
                attrs.append(name)
            elif name == 'style':
                values = []
                for part in value.split(';'):
                    if ':' not in part: continue
                    key, val = part.split(':',1)
                    key = key if key.startswith('--') else attr_name(key)
                    values.append(json.dumps(key) + ': ' + value_expr(html.unescape(val)))
                attrs.append('style={{' + ', '.join(values) + '}}')
            else:
                attrs.append(name + '={' + value_expr(html.unescape(value)) + '}')
        self.out.append('<' + original + (' ' + ' '.join(attrs) if attrs else '') + (' />' if closed or tag in voids else '>'))
    def handle_starttag(self, tag, attrs): self.tag(tag)
    def handle_startendtag(self, tag, attrs): self.tag(tag, True)
    def handle_endtag(self, tag):
        if tag not in voids:
            # HTMLParser lowercases tags; SVG uses a handful of mixed-case names.
            tag = {'lineargradient':'linearGradient','radialgradient':'radialGradient','clippath':'clipPath','textpath':'textPath','fegaussianblur':'feGaussianBlur'}.get(tag, tag)
            self.out.append('</' + tag + '>')
    def handle_data(self, data):
        if not data.strip():
            if data and '\n' not in data and '\r' not in data: self.out.append('{" "}')
            else: self.out.append('\n')
            return
        for part in re.split(r'(\$\{[^}]+\}|REACT_TOGGLE|REACT_CARTON)', data):
            if not part: continue
            if part.startswith('${'): self.out.append('{' + part[2:-1] + '}')
            elif part in ['REACT_TOGGLE','REACT_CARTON']:
                self.out.append({'REACT_TOGGLE':'<ColourToggle colour={colour} onChange={onColourChange} care />',
                                 'REACT_CARTON':'<Carton count={10} colour={colour} />'}[part])
            elif part.strip(): self.out.append('{' + json.dumps(part, ensure_ascii=False) + '}')

def jsx(markup):
    parser = JSX(); parser.feed(markup)
    return ''.join(parser.out)

def write_component(name, markup, props='', imports=''):
    result = jsx(markup.strip())
    if name == 'CareSection':
        result = result.replace('className={"care-carton"}', 'className={`care-carton ${colour === "white" ? "white-eggs" : ""}`}')
    if name == 'FarmSection':
        result = result.replace('className={"tour-button"}', 'className={"tour-button"} onClick={onOpenTour}')
    if name == 'Footer':
        for colour in ['brown','white']:
            result = result.replace('data-shop-colour={"' + colour + '"}', 'onClick={() => onColourChange("' + colour + '")}')
        result = result.replace('<span id={"year"}>{"2026"}</span>', '<span id="year">{new Date().getFullYear()}</span>')
    (components / (name + '.jsx')).write_text("import React from 'react';\n" + imports + '\nexport default function ' + name + '(' + props + ') {\n  return (\n' + result + '\n  );\n}\n', encoding='utf-8')

header = re.search(r'  <header[\s\S]*?</header>',source)[0]
footer = re.search(r'  <footer[\s\S]*?</footer>',source)[0]
write_component('Header',header)
write_component('Footer',footer,'{ onColourChange }')
section_names = {'home':'HeroSection','farm':'FarmSection','eggs':'EggsSection','inside':'InsideSection','egg-escape':'EscapeSection','cooking':'CookingSection','mornings':'MorningsSection','care':'CareSection'}
for match in re.finditer(r'    <section\b[^>]*\bid="([^"]+)"[\s\S]*?    </section>',source):
    key = match[1]
    if key not in section_names: continue
    markup = match[0]
    props = ''
    imports = ''
    if key == 'care':
        markup = re.sub(r'<div class="egg-toggle care-toggle"[\s\S]*?</div>', 'REACT_TOGGLE', markup)
        markup = markup.replace('data-carton="10" role=', 'data-carton="10" role=')
        markup = re.sub(r'(<div class="care-carton"[^>]*>)(</div>)', r'\1REACT_CARTON\2', markup)
        props = '{ colour, onColourChange }'
        imports = "import Carton from './Carton.jsx';\nimport ColourToggle from './ColourToggle.jsx';\n"
    if key == 'farm': props = '{ onOpenTour }'
    write_component(section_names[key],markup,props,imports)

# Preserve the existing carton illustration, with React arrays replacing markup injection.
bottom = (legacy / 'bottom.js').read_text(encoding='utf-8')
carton = re.search(r'return `(<svg class="carton-svg"[\s\S]*?)`;\n  }', bottom)[1]
carton = carton.replace('>10</text>', '>${count}</text>')
carton_jsx = jsx(carton)
carton_source = '''import React, { useId } from 'react';

export default function Carton({ count = 10, colour = 'brown' }) {
  const id = `carton-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const cols = count / 2, gap = 440 / cols, eggWidth = Math.min(67, gap * .8);
  const egg = (x, y, scale, key) => (
    <path key={key} className="carton-egg" d="M0 -52C-19 -52 -33 -12 -33 10C-33 38 -19 48 0 48S33 38 33 10C33 -12 19 -52 0 -52Z"
      transform={`translate(${x} ${y}) scale(${eggWidth / 66 * scale} ${scale})`}
      fill={`url(#${id}-brown)`} stroke="#614729" strokeOpacity=".1" />
  );
  const back = Array.from({ length: cols }, (_, i) => egg(80 + gap * (i + .5), 264, .91, i));
  const front = Array.from({ length: cols }, (_, i) => egg(80 + gap * (i + .5), 319, 1, i));
  const cups = Array.from({ length: cols }, (_, i) => {
    const x = 80 + gap * i;
    return <g key={i}><path d={`M${x} 338q${gap / 2} 22 ${gap} 0l-7 58q-${gap / 2 - 7} 19 -${gap - 14} 0Z`}
      fill={`url(#${id}-pulp)`} stroke="#b4a17b" strokeWidth="1.5" />
      <path d={`M${x + 7} 346q${gap / 2 - 7} 13 ${gap - 14} 0`} stroke="#f0e4c8" strokeWidth="4" /></g>;
  });
  return (
'''
carton_jsx = carton_jsx.replace('{"Fresh Brown Eggs"}', '{`Fresh ${colour === "white" ? "White" : "Brown"} Eggs`}')
(components / 'Carton.jsx').write_text(carton_source + carton_jsx + '\n  );\n}\n', encoding='utf-8')

# Animation modules are initialized by a React effect, never by importing a file.
module_names = {'script.js':'hero','bottom.js':'shopAndCare','cooking.js':'cooking','mornings.js':'mornings','escape.js':'escape','inside.js':'inside','journey.js':'journey'}
for filename, name in module_names.items():
    code = (legacy / filename).read_text(encoding='utf-8')
    code = re.sub(r'^\(\(\) => \{\s*', '', code)
    code = re.sub(r'\}\)\(\);\s*$', '', code)
    if filename == 'script.js':
        code = code[:code.index("  const dialog=document.querySelector('.info-dialog');")]
        code = code.replace('  inner.append(intro);', '  scope.own(intro);\n  inner.append(intro);')
        code = code.replace("  document.querySelector('.egg-layer').append(front);", "  scope.own(front);\n  document.querySelector('.egg-layer').append(front);")
    elif filename == 'bottom.js':
        code = code[:code.index("  const tour = document.querySelector('.tour-dialog');")]
        start = code.index("  const care = document.querySelector('.care-section');")
        code = "  const motion = matchMedia('(prefers-reduced-motion: reduce)');\n  let reduced = motion.matches;\n" + code[start:]
        a = code.index("  const flight = document.createElement('div');")
        b = code.index("  const open = care.querySelector('.carton-open');")
        code = code[:a] + "  const flight = document.querySelector('.carton-flight');\n" + code[b:]
    elif filename == 'cooking.js':
        code = code.replace('  flames.innerHTML =', '  scope.contents(flames);\n  flames.innerHTML =')
    elif filename == 'mornings.js':
        code = code.replace('    garnishLayer.append(el);', '    scope.own(el);\n    garnishLayer.append(el);')
    elif filename == 'escape.js':
        code = code.replace("particles.append(dot);", "scope.own(dot);particles.append(dot);")
    elif filename == 'journey.js':
        code = code.replace('  document.body.append(traveler);', '  scope.own(traveler);\n  document.body.append(traveler);')
    # Scoped event listeners and deferred callbacks are disposed on unmount/HMR.
    code = code.replace("section.querySelector('.escape-replay').addEventListener(", "scope.on(section.querySelector('.escape-replay'), ")
    code = re.sub(r'\b(button|motion)\.addEventListener\(', r'scope.on(\1, ', code)
    code = re.sub(r'(?<![.\w])addEventListener\(', 'scope.on(window, ', code)
    code = re.sub(r'document.fonts.ready.then\((\w+)\)', r'document.fonts.ready.then(scope.guard(\1))', code)
    code = code.replace("  'use strict';", '')
    declaration = f'export default function init{name[0].upper() + name[1:]}(scope) {{\n  const {{ requestAnimationFrame, ResizeObserver, IntersectionObserver }} = scope;\n'
    (animations / (name + '.js')).write_text(declaration + code + '\n}\n', encoding='utf-8')

for path in legacy.glob('*.css'):
    (styles / path.name).write_text(path.read_text(encoding='utf-8'), encoding='utf-8')
print('Created JSX section components, React carton, effect-based animations and styles.')
