import React from 'react';

export default function Header() {
  return (
<header className={"header"}>
<a className={"brand"} href={"#home"} aria-label={"Yolk and Co. home"}><span className={"brand-art"} aria-hidden={"true"}><span></span><span></span><span></span></span><span>{"Yolk "}<small>{"&"}</small>{" Co."}</span><span className={"brand-caption"}>{"A LITTLE GOOD, EVERY DAY."}</span></a>
<nav className={"navigation"} aria-label={"Main navigation"}><a href={"#eggs"}>{"Our Eggs"}</a><a href={"#shop"}>{"Shop"}</a><a href={"#farm"}>{"Our Poultry"}</a></nav>
<a className={"order-button"} href={"#shop"}>{"Order eggs "}<span aria-hidden={"true"}>{"↗"}</span></a>
</header>
  );
}
