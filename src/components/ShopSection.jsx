import React from 'react';
import Carton from './Carton.jsx';
import ColourToggle from './ColourToggle.jsx';

const packs = [{ count: 6, price: 84 }, { count: 10, price: 135 }, { count: 12, price: 159 }];

export default function ShopSection({ colour, onColourChange, onBuy }) {
  const label = colour === 'white' ? 'White' : 'Brown';
  return (
    <section className="shop-section" id="shop" aria-labelledby="shop-title">
      <div className="section-heading reveal">
        <p className="eyebrow">Fresh from the flock</p>
        <h2 id="shop-title">Pick your <span className="highlight">pack.</span></h2>
        <p>Brown or white, in boxes of 6, 10 or 12. Packed fresh from our flock.</p>
      </div>
      <ColourToggle colour={colour} onChange={onColourChange} />
      <p className="pack-note">pick a little sunny</p>
      <div className="product-grid">
        {packs.map(({ count, price }) => (
          <article className="product-card reveal" key={count}>
            <div className={`product-image${colour === 'white' ? ' white-eggs' : ''}`}
              data-carton={count} role="img" aria-label={`Open carton of ${count} ${colour} eggs`}>
              <Carton count={count} colour={colour} />
            </div>
            <h3><span className="product-colour">{label}</span> Eggs, Pack of {count}</h3>
            <div className="product-bottom">
              <span className="price">₹{price}</span>
              <button className="buy-button" type="button" data-pack={count} data-price={price}
                onClick={() => onBuy({ colour, count, price })}>
                Buy now <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="torn-edge shop-edge" aria-hidden="true" />
    </section>
  );
}
