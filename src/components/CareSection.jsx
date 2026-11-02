import React from 'react';
import Carton from './Carton.jsx';
import ColourToggle from './ColourToggle.jsx';

export default function CareSection({ colour, onColourChange }) {
  return (
<section className={"care-section"} id={"care"} aria-labelledby={"care-title"}>
<div className={"care-sticky"}>
<div className={"care-inner"}>
<div className={"care-copy"}><p className={"eyebrow"}>{"what you’ll receive"}</p><h2 id={"care-title"}>{"Packed soft."}<br /><span>{"Sealed with"}<br />{" sunshine."}</span></h2><p className={"care-description"}>{"Ten good eggs in a moulded-pulp carton. Closed up snug, and finished with our sticker. A little care, all the way to your door."}</p><ColourToggle colour={colour} onChange={onColourChange} care /><ol className={"care-steps"}>
<li className={"is-active is-current"} aria-current={"step"}><span className={"step-number"}>{"1"}</span><div><h3>{"Ten good eggs "}<span className={"care-fill-count"}>{"0 / 10"}</span></h3><p>{"One by one, each egg settles into its own little cup."}</p></div></li>
<li><span className={"step-number"}>{"2"}</span><div><h3>{"Closed up snug"}</h3><p>{"A soft pulp shell keeps everything cosy for the journey."}</p></div></li>
<li><span className={"step-number"}>{"3"}</span><div><h3>{"Sealed with our sticker"}</h3><p>{"The finishing touch. From our flock, with a little love."}</p></div></li>
</ol>
</div>
<div className={"care-visual"}>
<div className={"care-stage"} role={"img"} aria-label={"Scroll to nestle ten eggs into a carton, fold the lid closed, and add the Yolk and Co. sticker"}>
<div className={`care-carton ${colour === "white" ? "white-eggs" : ""}`} data-carton={"10"} aria-hidden={"true"}><Carton count={10} colour={colour} /></div>
</div>
<div className={"sticker-note"} aria-hidden={"true"}>{"our little seal of care"}<svg viewBox={"0 0 100 65"}><path d={"M95 6C55 0 33 16 15 53m0 0 0-20m0 20 19-8"} /></svg></div>
<p className={"scroll-cue"}><span className={"care-phase-label"}>{"a little scroll, a little care"}</span>{" "}<span>{"↓"}</span></p>
<div className={"care-progress"} role={"progressbar"} aria-label={"Packing your eggs"} aria-valuemin={"0"} aria-valuemax={"100"} aria-valuenow={"0"}><i></i></div>
</div>
</div>
</div>
<div className={"torn-edge care-edge"} aria-hidden={"true"}></div>
</section>
  );
}
