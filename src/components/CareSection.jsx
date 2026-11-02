import React from 'react';
import Carton from './Carton.jsx';
import ColourToggle from './ColourToggle.jsx';

export default function CareSection({ colour, onColourChange }) {
  return (
<section className={"care-section"} id={"care"} aria-labelledby={"care-title"}>
<div className={"care-sticky"}>
<div className={"care-inner"}>
<div className={"care-copy"}><p className={"eyebrow"}>{"what you’ll receive"}</p><h2 id={"care-title"}>{"Your eggs,"}<br /><span>{"boxed"}</span>{" with care."}</h2><p className={"care-description"}>{"Every order is packed in our moulded-pulp carton and sealed with our sticker. This is what lands on your doorstep."}</p><ColourToggle colour={colour} onChange={onColourChange} care /><ol className={"care-steps"}><li className={"is-active"}><span className={"step-number"}>{"1"}</span><div><h3>{"Ten good eggs"}</h3><p>{"Your pick of the flock, each one settled into its own cup."}</p></div></li><li><span className={"step-number"}>{"2"}</span><div><h3>{"Closed up snug"}</h3><p>{"A moulded-pulp carton keeps every egg cosy on its way to your door."}</p></div></li><li><span className={"step-number"}>{"3"}</span><div><h3>{"Sealed with our sticker"}</h3><p>{"The finishing touch, so you know it came from our flock."}</p></div></li></ol>
</div>
<div className={"care-visual"}><div className={`care-carton ${colour === "white" ? "white-eggs" : ""}`} data-carton={"10"} role={"img"} aria-label={"A ten-egg carton closes and is sealed with a Yolk and Co. label as you scroll"}><Carton count={10} colour={colour} /></div><div className={"sticker-note"} aria-hidden={"true"}>{"our sticker"}<svg viewBox={"0 0 100 65"}><path d={"M95 6C55 0 33 16 15 53m0 0 0-20m0 20 19-8"} /></svg></div><p className={"scroll-cue"}>{"a little scroll, a little care "}<span>{"↓"}</span></p></div>
</div>
</div>
<div className={"torn-edge care-edge"} aria-hidden={"true"}></div>
</section>
  );
}
