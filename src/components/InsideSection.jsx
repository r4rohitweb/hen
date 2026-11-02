import React from 'react';

export default function InsideSection() {
  return (
<section className={"inside-section"} id={"inside"} aria-labelledby={"inside-title"}>
<div className={"inside-sticky"}>
<div className={"inside-inner"}>
<div className={"inside-copy"}>
<p className={"eyebrow"}>{"A whole little world inside"}</p>
<h2 id={"inside-title"}>{"Small shell."}<br />{" A whole lot "}<span className={"highlight"}>{"inside."}</span></h2>
<p className={"inside-intro"}>{"An everyday little wonder."}<br />{"Come a little closer."}</p>
<div className={"inside-chapter"}><span className={"inside-count"}>{"04 / 05"}</span><h3 className={"inside-chapter-title"}>{"Meet the good inside."}</h3><p className={"inside-chapter-copy"}>{"A protective shell. A clear cushion of white. A golden yolk at the heart of it all."}</p></div>
<nav className={"inside-nav"} aria-label={"Explore inside an egg"} hidden>
<button type={"button"} data-inside-step={"0"} aria-label={"Chapter 1: One ordinary egg"}><span>{"01"}</span><i></i></button>
<button type={"button"} data-inside-step={"1"} aria-label={"Chapter 2: Look a little closer"}><span>{"02"}</span><i></i></button>
<button type={"button"} data-inside-step={"2"} aria-label={"Chapter 3: Open the story"}><span>{"03"}</span><i></i></button>
<button type={"button"} data-inside-step={"3"} aria-label={"Chapter 4: Meet the good inside"}><span>{"04"}</span><i></i></button>
<button type={"button"} data-inside-step={"4"} aria-label={"Chapter 5: Goodness comes together"}><span>{"05"}</span><i></i></button>
</nav>
<a className={"inside-skip"} href={"#egg-escape"}>{"Follow our little egg "}<span aria-hidden={"true"}>{"↓"}</span></a>
</div>
<div className={"inside-visual"}>
<span className={"inside-orbit inside-orbit-one"} aria-hidden={"true"}></span><span className={"inside-orbit inside-orbit-two"} aria-hidden={"true"}></span>
<span className={"inside-art-note"} aria-hidden={"true"}>{"a little closer, a little wonder."}</span>
<svg className={"inside-art"} viewBox={"0 0 760 660"} role={"img"} aria-labelledby={"inside-art-title inside-art-desc"}>
<title id={"inside-art-title"}>{"The little world inside an egg"}</title><desc id={"inside-art-desc"}>{"An illustrated egg opens into a speckled shell, translucent egg white and golden yolk. It comes together again, ready for the next part of its journey. Illustration of the layers, not to scale."}</desc>
<defs>
<radialGradient id={"inside-shell-fill"} cx={"30%"} cy={"24%"} r={"85%"}><stop stopColor={"#f0d4ad"} /><stop offset={".45"} stopColor={"#c89662"} /><stop offset={"1"} stopColor={"#8c542e"} /></radialGradient>
<radialGradient id={"inside-white-fill"} cx={"35%"} cy={"28%"}><stop stopColor={"#fffef4"} /><stop offset={".7"} stopColor={"#f8f1d9"} stopOpacity={".85"} /><stop offset={"1"} stopColor={"#d0ceb1"} stopOpacity={".75"} /></radialGradient>
<radialGradient id={"inside-yolk-fill"} cx={"32%"} cy={"28%"}><stop stopColor={"#fff09a"} /><stop offset={".45"} stopColor={"#f9c532"} /><stop offset={"1"} stopColor={"#df9614"} /></radialGradient>
<linearGradient id={"inside-pulp"} x2={"0"} y2={"1"}><stop stopColor={"#e5d4ac"} /><stop offset={"1"} stopColor={"#b59a70"} /></linearGradient>
<pattern id={"inside-speckles"} width={"31"} height={"37"} patternUnits={"userSpaceOnUse"}><circle cx={"7"} cy={"9"} r={"1.3"} fill={"#744420"} opacity={".3"} /><circle cx={"22"} cy={"27"} r={".9"} fill={"#fff2d9"} opacity={".6"} /></pattern>
<path id={"inside-egg-shape"} d={"M380 126C307 126 246 255 246 340c0 89 57 133 134 133s134-44 134-133c0-85-61-214-134-214Z"} />
<clipPath id={"inside-left-clip"}><path d={"M200 100H380V220l-12 19 22 23-23 23 22 23-21 24 20 24-8 20V500H200Z"} /></clipPath>
<clipPath id={"inside-right-clip"}><path d={"M380 100H560V500H380V376l8-20-20-24 21-24-22-23 23-23-22-23 12-19Z"} /></clipPath>
</defs>
<ellipse className={"inside-shadow"} cx={"380"} cy={"537"} rx={"137"} ry={"17"} fill={"#896235"} opacity={".13"} />
<g className={"inside-carton-back"} opacity={"0"}><path d={"M213 451 235 416H525l22 35v92H213Z"} fill={"url(#inside-pulp)"} stroke={"#a88c62"} strokeWidth={"2"} /><ellipse cx={"380"} cy={"455"} rx={"159"} ry={"32"} fill={"#947952"} /><g fill={"url(#inside-shell-fill)"}><ellipse cx={"278"} cy={"429"} rx={"28"} ry={"42"} transform={"rotate(-12 278 429)"} /><ellipse cx={"330"} cy={"420"} rx={"28"} ry={"42"} /><ellipse cx={"430"} cy={"420"} rx={"28"} ry={"42"} /><ellipse cx={"482"} cy={"429"} rx={"28"} ry={"42"} transform={"rotate(12 482 429)"} /></g></g>
<g className={"inside-egg-assembly"}>
<g className={"inside-white"}><use href={"#inside-egg-shape"} fill={"url(#inside-white-fill)"} stroke={"#c4c4a4"} strokeWidth={"1.5"} /><path d={"M293 320c-8-63 32-134 65-153"} fill={"none"} stroke={"#fffdf6"} strokeWidth={"8"} strokeLinecap={"round"} opacity={".8"} /></g>
<g className={"inside-yolk"}><circle cx={"380"} cy={"338"} r={"79"} fill={"url(#inside-yolk-fill)"} /><ellipse cx={"356"} cy={"307"} rx={"25"} ry={"14"} fill={"#fff5b5"} opacity={".65"} transform={"rotate(-28 356 307)"} /><path d={"M349 397q45 17 77-20"} fill={"none"} stroke={"#cd8b16"} strokeWidth={"2"} opacity={".35"} /></g>
<g className={"inside-shell-left"} clipPath={"url(#inside-left-clip)"}><use href={"#inside-egg-shape"} fill={"url(#inside-shell-fill)"} /><use href={"#inside-egg-shape"} fill={"url(#inside-speckles)"} /><path d={"M380 220l-12 19 22 23-23 23 22 23-21 24 20 24-8 20"} stroke={"#fbe6c5"} strokeWidth={"4"} fill={"none"} /></g>
<g className={"inside-shell-right"} clipPath={"url(#inside-right-clip)"}><use href={"#inside-egg-shape"} fill={"url(#inside-shell-fill)"} /><use href={"#inside-egg-shape"} fill={"url(#inside-speckles)"} /></g>
<g className={"inside-shell-intact"} opacity={"0"}><use href={"#inside-egg-shape"} fill={"url(#inside-shell-fill)"} /><use href={"#inside-egg-shape"} fill={"url(#inside-speckles)"} /></g>
</g>
<g className={"inside-carton-front"} opacity={"0"}><path d={"M213 458q167 45 334 0l-10 91q-157 36-314 0Z"} fill={"url(#inside-pulp)"} stroke={"#a88c62"} strokeWidth={"2"} /><path d={"M216 465q164 42 328 0"} stroke={"#f2e4c4"} strokeWidth={"8"} fill={"none"} /><path d={"m270 488 6 68m52-59 2 65m100-65-2 65m62-74-6 68"} stroke={"#b09972"} strokeWidth={"2"} /><rect x={"324"} y={"489"} width={"112"} height={"58"} rx={"5"} fill={"#31513c"} /><text x={"380"} y={"514"} textAnchor={"middle"} fill={"#fff8df"} fontFamily={"Nunito, sans-serif"} fontSize={"15"} fontWeight={"900"}>{"Yolk & Co."}</text><text x={"380"} y={"532"} textAnchor={"middle"} fill={"#e8d495"} fontFamily={"Nunito, sans-serif"} fontSize={"8"} letterSpacing={"1"}>{"GOOD TOGETHER"}</text></g>
</svg>
<div className={"inside-label inside-label-shell"}><span>{"01 / THE SHELL"}</span><strong>{"A little armour."}</strong><p>{"A porous outer shell helps protect what’s inside."}</p></div>
<div className={"inside-label inside-label-white"}><span>{"02 / THE WHITE"}</span><strong>{"A soft landing."}</strong><p>{"Also called albumen, it surrounds and cushions the yolk."}</p></div>
<div className={"inside-label inside-label-yolk"}><span>{"03 / THE YOLK"}</span><strong>{"The golden heart."}</strong><p>{"Held in its own thin membrane at the centre of the story."}</p></div>
<p className={"inside-scale-note"}>{"A little illustration. Layers shown apart, not to scale."}</p>
</div>
<a className={"inside-finish meet-button"} href={"#egg-escape"} hidden>{"Follow our little egg "}<span aria-hidden={"true"}>{"↗"}</span></a>
</div>
<div className={"inside-foot"} aria-hidden={"true"}><span>{"SMALL THINGS. EXTRAORDINARY DETAILS."}</span><span>{"scroll to look inside ↓"}</span></div>
</div>
<div className={"torn-edge bottom-edge"} aria-hidden={"true"}></div>
</section>
  );
}
