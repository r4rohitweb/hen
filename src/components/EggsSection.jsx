import React from 'react';

export default function EggsSection() {
  return (
<section className={"eggs-section"} id={"eggs"} aria-labelledby={"eggs-title"}>
<p className={"eyebrow"}>{"Meet the eggs"}</p>
<h2 id={"eggs-title"}>{"Two shells. Same good egg."}</h2>
<p className={"section-copy"}>{"The shell colour is just the breed of hen. The goodness inside is the same."}</p>
<div className={"egg-comparison"}>
<div className={"egg-column"}><div className={"destination destination-brown"}></div><div className={"paper-label"}><h3>{"The Brown One"}</h3><p>{"Laid by our happy, feathered hens."}</p></div></div>
<span className={"ampersand"} aria-hidden={"true"}>{"&"}</span>
<div className={"egg-column"}><div className={"destination destination-white"}></div><div className={"paper-label"}><h3>{"The White One"}</h3><p>{"Just as good. A little different outside."}</p></div></div>
</div>
<a className={"back-link"} href={"#inside"}>{"Look a little closer "}<span aria-hidden={"true"}>{"↓"}</span></a>
<div className={"torn-edge bottom-edge"} aria-hidden={"true"}></div>
</section>
  );
}
