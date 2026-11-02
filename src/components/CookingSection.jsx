import React from 'react';

export default function CookingSection() {
  return (
<section className={"cooking-section"} id={"cooking"} aria-labelledby={"cooking-title"}>
<div className={"cooking-sticky"}><div className={"cooking-inner"}>
<div className={"cooking-copy"}><p className={"eyebrow"}>{"A little kitchen magic"}</p><h2 id={"cooking-title"}>{"From "}<span className={"highlight"}>{"shell"}</span><br />{" to skillet."}</h2><p className={"cooking-intro"}>{"One good egg. One warm pan."}<br />{" Scroll a little. Make a good morning."}</p>
<ol className={"cooking-steps"}><li className={"is-current"} aria-current={"step"}><span>{"01"}</span><div><h3>{"A little crack."}</h3><p>{"Every good morning starts somewhere."}</p></div></li><li><span>{"02"}</span><div><h3>{"Into the pan."}</h3><p>{"The yolk and white, together at last."}</p></div></li><li><span>{"03"}</span><div><h3>{"Whisk up some sunshine."}</h3><p>{"A little swirl brings it all together."}</p></div></li><li><span>{"04"}</span><div><h3>{"A little warmth."}</h3><p>{"Flame on. Let the magic happen."}</p></div></li><li><span>{"05"}</span><div><h3>{"Hello, golden omelette."}</h3><p>{"Fold it over. Your sunny side is ready."}</p></div></li></ol>
<a className={"cooking-skip"} href={"#shop"}>{"Skip to the egg shop "}<span aria-hidden={"true"}>{"↓"}</span></a>
</div>
<div className={"cooking-visual"}>
<div className={"cooking-halo"} aria-hidden={"true"}></div>
<svg className={"kitchen-scene"} viewBox={"0 0 900 700"} role={"img"} aria-labelledby={"kitchen-title kitchen-desc"}>
<title id={"kitchen-title"}>{"An egg becomes a golden omelette"}</title><desc id={"kitchen-desc"}>{"Scroll to crack the shell, pour the white and yolk into a frying pan, whisk them together, light the gas, and cook and fold the omelette."}</desc>
<defs>
<radialGradient id={"kitchen-shell"} cx={"32%"} cy={"28%"} r={"80%"}><stop stopColor={"#f7dfb5"} /><stop offset={".45"} stopColor={"#d4ab75"} /><stop offset={"1"} stopColor={"#9b6639"} /></radialGradient>
<radialGradient id={"kitchen-yolk"} cx={"32%"} cy={"25%"}><stop stopColor={"#ffec80"} /><stop offset={".48"} stopColor={"#ffc326"} /><stop offset={"1"} stopColor={"#e99b09"} /></radialGradient>
<radialGradient id={"kitchen-white"}><stop stopColor={"#fffcdb"} stopOpacity={".93"} /><stop offset={"1"} stopColor={"#e8e3bf"} stopOpacity={".72"} /></radialGradient>
<linearGradient id={"kitchen-pan"} x2={"0"} y2={"1"}><stop stopColor={"#55554a"} /><stop offset={".5"} stopColor={"#353a31"} /><stop offset={"1"} stopColor={"#1e251f"} /></linearGradient>
<radialGradient id={"kitchen-surface"}><stop stopColor={"#414c3d"} /><stop offset={"1"} stopColor={"#222b23"} /></radialGradient>
<linearGradient id={"kitchen-omelette"} x2={".2"} y2={"1"}><stop stopColor={"#ffe47a"} /><stop offset={".6"} stopColor={"#efbf38"} /><stop offset={"1"} stopColor={"#d6951d"} /></linearGradient>
<linearGradient id={"kitchen-flame"} x2={"0"} y2={"1"}><stop stopColor={"#b1edff"} /><stop offset={".5"} stopColor={"#68bddf"} /><stop offset={"1"} stopColor={"#3379c7"} /></linearGradient>
<linearGradient id={"kitchen-stove"} x2={"0"} y2={"1"}><stop stopColor={"#ede3ce"} /><stop offset={"1"} stopColor={"#c8bfa9"} /></linearGradient>
<clipPath id={"kitchen-shell-left"}><path d={"M250 0H427V80l-12 21 18 20-19 22 14 22-18 25 16 22-13 22 14 25V310H250Z"} /></clipPath>
<clipPath id={"kitchen-shell-right"}><path d={"M427 0H600V310H427v-51l-14-25 13-22-16-22 18-25-14-22 19-22-18-20 12-21Z"} /></clipPath>
<clipPath id={"kitchen-bottom-half"}><path d={"M200 477H650V580H200Z"} /></clipPath>
<clipPath id={"kitchen-top-half"}><path d={"M200 380H650V477H200Z"} /></clipPath>
<filter id={"kitchen-shadow"}><feGaussianBlur stdDeviation={"11"} /></filter>
<path id={"kitchen-egg-shape"} d={"M425 39C373 39 333 128 333 184c0 54 37 80 92 80s92-26 92-80c0-56-40-145-92-145Z"} />
<g id={"kitchen-golden-egg"}><ellipse cx={"425"} cy={"477"} rx={"165"} ry={"65"} fill={"url(#kitchen-omelette)"} stroke={"#e8b338"} strokeWidth={"2"} /><g fill={"#c38b28"} opacity={".36"}><ellipse cx={"338"} cy={"477"} rx={"15"} ry={"6"} /><ellipse cx={"395"} cy={"508"} rx={"9"} ry={"4"} /><ellipse cx={"486"} cy={"475"} rx={"17"} ry={"5"} /><ellipse cx={"457"} cy={"431"} rx={"11"} ry={"5"} /><ellipse cx={"524"} cy={"493"} rx={"8"} ry={"3"} /><ellipse cx={"365"} cy={"446"} rx={"6"} ry={"3"} /></g></g>
</defs>
<ellipse cx={"438"} cy={"657"} rx={"277"} ry={"21"} fill={"#765c28"} opacity={".14"} filter={"url(#kitchen-shadow)"} />
<g className={"kitchen-stove"}><path d={"M223 567H623l39 46-5 42H190l-6-42Z"} fill={"url(#kitchen-stove)"} stroke={"#bcb098"} strokeWidth={"2"} /><path d={"M184 613h478l-5 42H190Z"} fill={"#d8cdb6"} /><path d={"M204 616h438"} stroke={"#f9f2e0"} strokeWidth={"3"} /><ellipse cx={"425"} cy={"585"} rx={"152"} ry={"40"} fill={"#393c32"} /><ellipse cx={"425"} cy={"585"} rx={"117"} ry={"28"} fill={"none"} stroke={"#696a58"} strokeWidth={"8"} /><path d={"m288 551 47 63m225-63-46 63m-85-72v72"} stroke={"#323b32"} strokeWidth={"13"} strokeLinecap={"round"} /><circle cx={"569"} cy={"634"} r={"15"} fill={"#3b4136"} /><path className={"stove-knob"} d={"M569 625v16"} stroke={"#e9dcc2"} strokeWidth={"3"} strokeLinecap={"round"} /><circle className={"gas-indicator"} cx={"607"} cy={"634"} r={"4"} fill={"#6d7460"} /></g>
<g className={"kitchen-flames"} opacity={"0"}></g>
<path d={"M187 452C192 541 269 579 425 579s233-38 238-127Z"} fill={"url(#kitchen-pan)"} stroke={"#212a22"} strokeWidth={"3"} />
<path d={"m631 430 175-83q27-12 33 6l5 14q5 15-15 24l-176 76Z"} fill={"#a0733b"} stroke={"#785329"} strokeWidth={"3"} /><path d={"m669 426 151-67"} stroke={"#c89d61"} strokeWidth={"5"} strokeLinecap={"round"} /><ellipse cx={"818"} cy={"365"} rx={"8"} ry={"4"} transform={"rotate(-25 818 365)"} fill={"#6f4e2c"} />
<ellipse cx={"425"} cy={"450"} rx={"238"} ry={"94"} fill={"#646e59"} stroke={"#89907c"} strokeWidth={"3"} /><ellipse cx={"425"} cy={"452"} rx={"224"} ry={"81"} fill={"url(#kitchen-surface)"} />
<ellipse cx={"425"} cy={"468"} rx={"177"} ry={"53"} fill={"#aeae65"} opacity={".13"} />
<g className={"pan-raw-egg"} opacity={"0"}><path d={"M265 468c-6-23 36-37 70-42 27-20 63-18 89-11 27-10 60-4 77 7 50-1 89 17 86 41 14 24-15 47-56 48-31 17-72 12-102 8-31 14-68 6-91-5-41 2-79-18-73-46Z"} fill={"url(#kitchen-white)"} /><ellipse className={"pan-yolk"} cx={"425"} cy={"462"} rx={"46"} ry={"34"} fill={"url(#kitchen-yolk)"} /><ellipse cx={"411"} cy={"450"} rx={"15"} ry={"8"} fill={"#fff5b6"} opacity={".65"} /></g>
<g className={"pan-mixture"} opacity={"0"}><ellipse cx={"425"} cy={"477"} rx={"165"} ry={"65"} fill={"#f8ce55"} /><path className={"mixture-swirl"} d={"M334 475c9-38 164-44 183-4 17 36-139 49-143 5-3-25 85-27 92-5"} fill={"none"} stroke={"#fff0a4"} strokeWidth={"7"} strokeLinecap={"round"} opacity={".65"} /></g>
<g className={"pan-omelette"} opacity={"0"}><g clipPath={"url(#kitchen-bottom-half)"}><use href={"#kitchen-golden-egg"} /></g><g className={"omelette-fold"}><g clipPath={"url(#kitchen-top-half)"}><use href={"#kitchen-golden-egg"} /></g></g><g className={"omelette-herbs"} opacity={"0"} fill={"#638044"}><path d={"m340 486 15-8 9 5-15 9Zm63 19 10-8 10 6-12 7Zm69-15 13-8 8 5-13 8Zm47 13 8-6 10 4-10 8Z"} /><circle cx={"386"} cy={"487"} r={"3"} /><circle cx={"458"} cy={"514"} r={"3"} /></g></g>
<g className={"cooking-bubbles"} opacity={"0"} fill={"none"} stroke={"#fff2b0"} strokeWidth={"2"}><ellipse cx={"311"} cy={"480"} rx={"6"} ry={"3"} /><ellipse cx={"356"} cy={"507"} rx={"5"} ry={"3"} /><ellipse cx={"514"} cy={"489"} rx={"7"} ry={"4"} /><ellipse cx={"478"} cy={"438"} rx={"4"} ry={"2"} /><ellipse cx={"396"} cy={"427"} rx={"6"} ry={"3"} /></g>
<path d={"M192 463c27 55 118 80 233 80s206-25 233-80"} fill={"none"} stroke={"#7b846b"} strokeWidth={"4"} opacity={".6"} />
<g className={"falling-white"} opacity={"0"}><path d={"M418 231c-8 51 13 68 1 111-7 27-5 54 7 86"} fill={"none"} stroke={"#fff9dc"} strokeWidth={"17"} strokeLinecap={"round"} opacity={".8"} /><path d={"M434 237c8 49-7 74 2 107"} fill={"none"} stroke={"#fffdf0"} strokeWidth={"5"} strokeLinecap={"round"} opacity={".8"} /></g>
<g className={"falling-yolk"} opacity={"0"}><ellipse cx={"425"} cy={"245"} rx={"35"} ry={"39"} fill={"url(#kitchen-yolk)"} /><ellipse cx={"414"} cy={"233"} rx={"10"} ry={"7"} fill={"#fff2a0"} opacity={".8"} /></g>
<g className={"cooking-shell"}><g className={"shell-left"} clipPath={"url(#kitchen-shell-left)"}><use href={"#kitchen-egg-shape"} fill={"url(#kitchen-shell)"} /></g><g className={"shell-right"} clipPath={"url(#kitchen-shell-right)"}><use href={"#kitchen-egg-shape"} fill={"url(#kitchen-shell)"} /></g><path className={"shell-crack"} d={"m427 80-12 21 18 20-19 22 14 22-18 25 16 22-13 22 14 25"} fill={"none"} stroke={"#79512e"} strokeWidth={"3"} strokeLinecap={"round"} pathLength={"1"} strokeDasharray={"1"} strokeDashoffset={"1"} /></g>
<g className={"cooking-whisk"} opacity={"0"} fill={"none"} strokeLinecap={"round"}><path d={"m459 398 86-155"} stroke={"#997548"} strokeWidth={"19"} /><path d={"m460 396 82-149"} stroke={"#d6ba84"} strokeWidth={"7"} /><path d={"M460 393c-77-13-120 44-74 72 48 29 86-20 74-72Zm0 0c-35 17-75 47-58 66 19 22 48-26 58-66Zm0 0c-4 48-36 87-58 66"} stroke={"#c9cfc0"} strokeWidth={"4"} /><path d={"m455 389 11 6"} stroke={"#a8b1a0"} strokeWidth={"12"} /></g>
<g className={"cooking-steam"} opacity={"0"} fill={"none"} stroke={"#c1b68a"} strokeWidth={"4"} strokeLinecap={"round"}><path d={"M350 370c-26-30 28-39 2-72"} /><path d={"M424 354c-26-30 28-39 2-72"} /><path d={"M496 370c-26-30 28-39 2-72"} /></g>
<g className={"kitchen-sparkles"} opacity={"0"} fill={"#d5a12c"}><path d={"m249 359 5 13 13 5-13 5-5 13-5-13-13-5 13-5Z"} /><path d={"m617 324 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"} /></g>
</svg>
<div className={"cooking-caption"}><span className={"cooking-stage-count"}>{"01 / 05"}</span><p className={"cooking-stage-label"}>{"A little crack. A lot of possibility."}</p><span className={"cooking-scroll-icon"} aria-hidden={"true"}>{"↓"}</span></div>
<div className={"cooking-progress"} role={"progressbar"} aria-label={"Egg to omelette scroll progress"} aria-valuemin={"0"} aria-valuemax={"100"} aria-valuenow={"0"}><span></span></div>
<a className={"cooking-shop-link"} href={"#shop"}>{"Good eggs make good mornings. Meet yours "}<span aria-hidden={"true"}>{"↗"}</span></a>
</div>
</div></div>
<div className={"torn-edge bottom-edge"} aria-hidden={"true"}></div>
</section>
  );
}
