import React from 'react';

export default function HeroSection() {
  return (
<section className={"hero"} id={"home"} aria-labelledby={"hero-title"}>
<div className={"hero-inner"}>
<svg className={"hero-landscape"} viewBox={"0 0 1600 900"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"}>
<defs><linearGradient id={"hero-sky"} x2={"0"} y2={"1"}><stop stopColor={"#f9ecc2"} /><stop offset={"1"} stopColor={"#efcf77"} /></linearGradient><linearGradient id={"hero-ground"} x2={"0"} y2={"1"}><stop stopColor={"#e9c66e"} /><stop offset={"1"} stopColor={"#f5dfa0"} /></linearGradient><linearGradient id={"barn-wood"} x2={"0"} y2={"1"}><stop stopColor={"#d2a06a"} /><stop offset={"1"} stopColor={"#b7834d"} /></linearGradient></defs>
<path fill={"url(#hero-sky)"} d={"M0 0h1600v900H0Z"} />
<circle cx={"222"} cy={"237"} r={"118"} fill={"#fff3ba"} opacity={".65"} /><circle cx={"222"} cy={"237"} r={"151"} fill={"none"} stroke={"#fff5d3"} strokeWidth={"1"} opacity={".65"} />
<g fill={"#fff8dd"} opacity={".55"}><path d={"M-54 169c44-45 88-33 112-7 12-54 91-61 114-7 45-19 86-2 97 24H-54Z"} /><path d={"M1174 170c20-23 48-30 70-9 9-45 76-51 99-9 40-19 85-4 93 25h-262Z"} /><path d={"M1390 309c31-33 71-36 94-10 21-46 80-38 99-4 33-13 67-3 80 23h-273Z"} /></g>
<path d={"M0 529Q180 363 423 490T847 467t434-19 319 49V900H0Z"} fill={"#d9c17f"} /><path d={"M0 635Q252 466 504 591t447-16 649-25V900H0Z"} fill={"#c5b77a"} />
<g fill={"none"} stroke={"#efe1a7"} strokeWidth={"3"} opacity={".5"}><path d={"M0 578q193-108 401-28m-401 59q220-108 418-30m-418 63q220-102 440-29m658-47q235-100 502-41m-484 66q230-88 484-37m-464 63q231-75 464-32"} /></g>
<g transform={"translate(1190 374)"}><path d={"M-24 117 154-6l178 123Z"} fill={"#775a3d"} /><path d={"M0 113h308v205H0Z"} fill={"url(#barn-wood)"} /><path d={"m-35 114 188-133 192 133"} fill={"none"} stroke={"#5b4935"} strokeWidth={"13"} strokeLinecap={"round"} strokeLinejoin={"round"} /><g stroke={"#e4bd86"} strokeWidth={"3"} opacity={".6"}><path d={"M24 113v205m30-205v205m30-205v205m30-205v205m80-205v205m30-205v205m30-205v205m30-205v205"} /></g><path d={"M108 194h94v124h-94Z"} fill={"#765236"} /><path d={"M107 195h96v123h-96Z"} fill={"none"} stroke={"#eed5a8"} strokeWidth={"6"} /><path d={"m111 199 88 116m0-116-88 116"} stroke={"#e1bc87"} strokeWidth={"5"} /><rect x={"30"} y={"155"} width={"44"} height={"44"} rx={"2"} fill={"#6d6045"} stroke={"#e8c894"} strokeWidth={"5"} /><rect x={"236"} y={"155"} width={"44"} height={"44"} rx={"2"} fill={"#6d6045"} stroke={"#e8c894"} strokeWidth={"5"} /><path d={"M52 155v44m-22-22h44m184-22v44m-22-22h44"} stroke={"#e8c894"} strokeWidth={"3"} /><circle cx={"154"} cy={"102"} r={"25"} fill={"#b48250"} stroke={"#e7c490"} strokeWidth={"5"} /><path d={"m139 88 30 29m-30 0 30-29"} stroke={"#e7c490"} strokeWidth={"3"} /></g>
<path d={"M0 753Q240 694 456 737t420-7 386 9 338-9V900H0Z"} fill={"url(#hero-ground)"} />
<g fill={"none"} strokeLinecap={"round"}><g stroke={"#b48c4f"} strokeWidth={"7"}><path d={"M0 670h446m-446 42h446m-400-79v117m91-127v117m96-116v113m98-115v115m98-109v116"} /><path d={"M1429 694h171m-155-41v101m91-113v114"} /></g><g stroke={"#efd19a"} strokeWidth={"2"}><path d={"M0 667h446m-446 42h446m983-18h171"} /></g></g>
<g fill={"none"} stroke={"#a78742"} strokeWidth={"3"} strokeLinecap={"round"}><path d={"M75 881Q73 699 128 592m-27 292Q93 722 165 641M38 882Q60 738 44 662m113 225q-30-126 14-212m1379 211q-20-126-66-200m97 201q-3-160-41-234"} /></g>
<g fill={"#c29d4d"}><path d={"M126 596q-32 5-19 29 26-1 19-29m-17 34q-32-3-20 23 24 6 20-23m-16 31q-29-4-19 22 23 9 19-22m70-18q-30 1-24 28 26 1 24-28m-23 32q-29-3-23 22 22 8 23-22m-96-13q-20 15-2 31 22-9 2-31m113 16q-27 7-12 29 25-5 12-29m1331 15q27-1 20 24-24 8-20-24m41-39q26 7 13 30-24-2-13-30"} /></g>
<g stroke={"#c7a257"} strokeWidth={"2"} strokeLinecap={"round"} opacity={".6"}><path d={"m296 825 20 4m-9-16 16 2m843 31 21-3m-10 15 13-4m-92-45 18 4M182 789l15 2m1187 34 19-5m-140 41 16 2"} /></g>
</svg>
<div className={"hero-copy"}>
<p className={"hero-story-kicker"}>{"ONE HEN. ONE EGG. A WHOLE LITTLE JOURNEY."}</p>
<h1 id={"hero-title"}><span className={"headline-line"}>{"Good "}<span className={"highlight"}>{"eggs."}</span></span><span className={"headline-line"}>{"Better"}</span><span className={"headline-line"}><span className={"highlight"}>{"mornings."}</span></span></h1>
<p>{"Fresh brown and white eggs, from our flock to your pan."}</p>
<a className={"meet-button"} href={"#farm"}>{"Follow this egg "}<span aria-hidden={"true"}>{"↓"}</span></a>
<div className={"hero-story-route"} aria-label={"Follow the story from our farm to your breakfast"}><span><b>{"01"}</b>{" Our flock"}</span><i aria-hidden={"true"}></i><span><b>{"02"}</b>{" One good egg"}</span><i aria-hidden={"true"}></i><span><b>{"03"}</b>{" Your morning"}</span></div>
</div>
<div className={"hero-scene"} aria-label={"A hen lays one brown egg. Follow its journey from the farm to your breakfast as you scroll"} role={"img"}>
<div className={"egg-display"} aria-hidden={"true"}>
<div className={"egg-sun"}></div>
<p className={"egg-display-note"}>{"Fresh from"}<br />{"our flock."}<svg viewBox={"0 0 90 65"}><path d={"M9 6C46 1 72 20 66 52m0 0-11-14m11 14 13-9"} /></svg></p>
<svg className={"egg-stamp"} viewBox={"0 0 120 120"}><defs><path id={"egg-stamp-circle"} d={"M60 15a45 45 0 1 1-.1 0"} /></defs><circle cx={"60"} cy={"60"} r={"56"} fill={"#f7e9b7"} /><circle cx={"60"} cy={"60"} r={"52"} fill={"none"} stroke={"#c6a452"} strokeDasharray={"2 4"} /><text><textPath href={"#egg-stamp-circle"} startOffset={"1%"}>{"GOOD EGGS · GOOD MORNINGS · "}</textPath></text><path d={"M60 38c-10 0-18 18-18 29 0 11 7 16 18 16s18-5 18-16c0-11-8-29-18-29Z"} fill={"#dbad4c"} /><path d={"m53 62 5 5 10-12"} fill={"none"} stroke={"#fff7de"} strokeWidth={"3"} strokeLinecap={"round"} strokeLinejoin={"round"} /></svg>
<svg className={"egg-tokri"} viewBox={"0 0 600 400"} aria-hidden={"true"}><defs><linearGradient id={"tokri-wood"} x2={"0"} y2={"1"}><stop stopColor={"#d4a66b"} /><stop offset={".5"} stopColor={"#b27c45"} /><stop offset={"1"} stopColor={"#88552e"} /></linearGradient><linearGradient id={"tokri-rim"} x2={"0"} y2={"1"}><stop stopColor={"#ebc38c"} /><stop offset={"1"} stopColor={"#a66e36"} /></linearGradient><pattern id={"tokri-weave"} width={"44"} height={"26"} patternUnits={"userSpaceOnUse"}><rect width={"44"} height={"26"} fill={"#bd8b53"} /><path d={"M0 5h44M0 18h44"} stroke={"#e1b37b"} strokeWidth={"6"} /><path d={"m5 0 4 26m22-26 4 26"} stroke={"#8f5b30"} strokeWidth={"5"} /><path d={"m7 0 4 26m22-26 4 26"} stroke={"#d7a46c"} strokeWidth={"2"} /></pattern><radialGradient id={"tokri-ground"}><stop stopColor={"#634121"} stopOpacity={".25"} /><stop offset={"1"} stopColor={"#634121"} stopOpacity={"0"} /></radialGradient></defs><ellipse cx={"300"} cy={"373"} rx={"240"} ry={"23"} fill={"url(#tokri-ground)"} /><path d={"M111 234C104-25 496-25 489 234"} fill={"none"} stroke={"#986131"} strokeWidth={"27"} /><path d={"M111 234C104-25 496-25 489 234"} fill={"none"} stroke={"#ddb17a"} strokeWidth={"17"} /><path d={"M111 234C104-25 496-25 489 234"} fill={"none"} stroke={"#ad7945"} strokeWidth={"4"} strokeDasharray={"3 11"} /><path d={"M60 235 110 350Q300 410 490 350L540 235Z"} fill={"url(#tokri-wood)"} /><ellipse cx={"300"} cy={"235"} rx={"240"} ry={"70"} fill={"url(#tokri-rim)"} /><ellipse cx={"300"} cy={"235"} rx={"220"} ry={"52"} fill={"#8e6037"} /><ellipse cx={"300"} cy={"239"} rx={"204"} ry={"41"} fill={"#a87c4b"} /></svg>
<span className={"egg-display-caption"}>{"One little egg. "}<em>{"A whole story ahead."}</em></span>
</div>
<span className={"speech"} aria-hidden={"true"}>{"bok bok!"}</span>
<span className={"sparkle sparkle-one"} aria-hidden={"true"}>{"✦"}</span>
<span className={"sparkle sparkle-two"} aria-hidden={"true"}>{"✦"}</span>
<div className={"hen-walker"}><svg xmlns={"http://www.w3.org/2000/svg"} className={"hen"} viewBox={"0 0 560 570"} aria-hidden={"true"} fill={"none"}>
<defs>
<linearGradient id={"body"} x1={"230"} y1={"140"} x2={"430"} y2={"470"} gradientUnits={"userSpaceOnUse"}><stop stopColor={"#ffdc36"} /><stop offset={".52"} stopColor={"#f9c416"} /><stop offset={"1"} stopColor={"#e9a400"} /></linearGradient>
<linearGradient id={"tail"} x1={"60"} y1={"190"} x2={"190"} y2={"330"}><stop stopColor={"#63402b"} /><stop offset={"1"} stopColor={"#a66c35"} /></linearGradient>
<linearGradient id={"wing"} x1={"230"} y1={"300"} x2={"340"} y2={"400"}><stop stopColor={"#efad03"} /><stop offset={"1"} stopColor={"#e29a00"} /></linearGradient>
<radialGradient id={"shade"}><stop stopColor={"#a08b50"} stopOpacity={".22"} /><stop offset={"1"} stopColor={"#a08b50"} stopOpacity={"0"} /></radialGradient>
</defs>
<ellipse cx={"308"} cy={"526"} rx={"185"} ry={"22"} fill={"url(#shade)"} />
<g stroke={"#c29532"} strokeWidth={"4"} strokeLinecap={"round"}><path d={"m168 519 52-12 66 18 69-9 69 15M203 534l63-8 58 13 84-7M304 508l57 11 58-5 45 15"} /></g>
<g stroke={"#cc891e"} strokeWidth={"7"} strokeLinecap={"round"}><path className={"hen-leg hen-leg-left"} d={"m289 462-13 43-19 7"} /><path className={"hen-leg hen-leg-right"} d={"m353 463 8 42 16 8"} /></g>
<g fill={"url(#tail)"}>
<path d={"M193 318C119 297 109 219 117 144c54 29 88 96 76 174Z"} />
<path d={"M191 324C132 319 63 272 50 211c74 10 130 49 141 113Z"} />
<path d={"M200 314C153 242 151 164 173 102c45 52 61 135 27 212Z"} />
</g>
<g stroke={"#c29360"} strokeWidth={"3"} strokeLinecap={"round"} opacity={".7"}><path d={"m174 125 26 163M66 225l106 81M128 162l54 128"} /></g>
<path d={"M161 296c12-62 59-94 131-93 51 0 91 15 121 44 37 34 63 62 60 93-8 91-58 143-151 147-107 5-165-46-169-125-1-24 1-46 8-66Z"} fill={"url(#body)"} />
<path d={"M180 278c14-39 58-58 110-56 24 1 48 6 59 18 12 14-6 24-28 24-64-1-99 29-124 29-12 0-21-4-17-15Z"} fill={"#ffe878"} opacity={".72"} />
<path d={"M220 300c37-23 98-19 137 0 32 15 35 38 21 60-7 12-12 22-29 22-10 21-24 20-36 14-14 14-29 7-37-1-15 7-28-1-30-11-21 4-32-8-32-21-14-10-20-46 6-63Z"} fill={"url(#wing)"} />
<g stroke={"#d79506"} strokeWidth={"4"} strokeLinecap={"round"}><path d={"M237 319c30-12 69-8 103 7M244 342c25-8 56-5 82 5M258 363c17-5 32-3 46 2"} /></g>
<g className={"hen-head"}>{" "}<g fill={"#d94a32"}><path d={"M369 104c-21-22-11-51 7-51 16 0 19 23 19 35-2-35 13-51 27-42 16 10 4 36-2 48 19-30 37-26 40-12 5 21-18 36-37 43Z"} /></g>
<path d={"m453 139 48 20-46 22Z"} fill={"#df8d15"} /><path d={"m458 159 38 1-37 9"} fill={"#b66a16"} />
<path d={"M332 250c28-19 9-72 25-110 5-35 31-58 61-53 45 7 62 37 59 75-2 28-15 45-17 73 0 28 11 48 12 77-48 24-95 0-140-62Z"} fill={"url(#body)"} />{" "}<path d={"M454 191c17 8 23 38 8 49-15 12-25-12-21-30 2-10 6-17 13-19Z"} fill={"#e34b32"} />
<ellipse cx={"427"} cy={"145"} rx={"13"} ry={"15"} fill={"#fff9dd"} /><ellipse cx={"430"} cy={"145"} rx={"8"} ry={"10"} fill={"#34251a"} /><circle cx={"432"} cy={"141"} r={"3.5"} fill={"white"} />
<ellipse cx={"429"} cy={"179"} rx={"13"} ry={"9"} fill={"#edab24"} opacity={".8"} />
</g>
</svg>
</div>
<span className={"egg-slot hero-brown"}></span><span className={"egg-slot hero-white"}></span>
</div>
<div className={"grain-trail"} aria-hidden={"true"}></div>
<p className={"hen-scroll-hint"} aria-hidden={"true"}>{"One little egg. Follow it down. "}<span>{"↓"}</span></p>
</div>
<div className={"torn-edge"} aria-hidden={"true"}></div>
</section>
  );
}
