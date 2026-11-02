import React from 'react';
import Carton from './Carton.jsx';

export default function AnimationLayers({ colour }) {
  return <>
    <div className="egg-layer" aria-hidden="true">
      <div className="egg egg-brown"><span /></div>
      <div className="egg egg-white"><span /></div>
    </div>
    <img className="hero-nest-front" src="assets/hero-nest-front.svg" alt="" aria-hidden="true" width="440" height="170" />
    <div className={`carton-flight${colour === 'white' ? ' white-eggs' : ''}`} data-carton="10" aria-hidden="true">
      <Carton count={10} colour={colour} />
    </div>
  </>;
}
