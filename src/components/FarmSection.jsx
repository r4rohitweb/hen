import React from 'react';

export default function FarmSection({ onOpenTour }) {
  return (
<section className={"farm-section"} id={"farm"} aria-labelledby={"farm-title"}>
<div className={"section-heading reveal"}><p className={"eyebrow"}>{"A peek at our world"}</p><h2 id={"farm-title"}>{"Meet the "}<span className={"farm-highlight"}>{"farm"}</span><br />{"behind the eggs."}</h2><p>{"A peek at where our hens live and where every egg begins."}</p></div>
<div className={"journey-farm-stop"} aria-hidden={"true"}><div className={"journey-farm-egg"}></div><span>{"Our story starts here."}<br />{"One good egg, fresh from the flock."}</span></div>
<div className={"farm-gallery"}><figure className={"farm-photo reveal"}><img src={"assets/farm-exterior.png"} alt={"Illustrative view of a poultry farm in warm evening light"} loading={"lazy"} width={"1536"} height={"1024"} /><figcaption>{"the farm"}</figcaption></figure><figure className={"farm-photo reveal"}><img src={"assets/farm-interior.png"} alt={"Illustrative view inside a sunlit poultry barn"} loading={"lazy"} width={"1536"} height={"1024"} /><figcaption>{"inside the barn"}</figcaption></figure></div>
<button className={"tour-button"} onClick={onOpenTour}><span aria-hidden={"true"}>{"▶"}</span>{" Take the poultry tour"}</button>
<div className={"torn-edge bottom-edge"} aria-hidden={"true"}></div>
</section>
  );
}
