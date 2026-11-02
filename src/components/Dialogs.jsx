import React, { useEffect, useRef, useState } from 'react';

const tourItems = [
  { src: 'assets/farm-exterior.png', title: 'Around the farm', caption: 'The farm · 1 / 2', alt: 'Illustrative exterior of a poultry farm at golden hour' },
  { src: 'assets/farm-interior.png', title: 'Inside the barn', caption: 'Inside the barn · 2 / 2', alt: 'Illustrative interior of a sunlit poultry barn' },
];

export default function Dialogs({ selection, onCloseOrder, tourOpen, onCloseTour }) {
  const orderRef = useRef(null);
  const tourRef = useRef(null);
  const [tourIndex, setTourIndex] = useState(0);
  const tour = tourItems[tourIndex];

  useEffect(() => {
    const dialog = orderRef.current;
    if (selection && !dialog.open) dialog.showModal();
    else if (!selection && dialog.open) dialog.close();
  }, [selection]);

  useEffect(() => {
    const dialog = tourRef.current;
    if (tourOpen && !dialog.open) {
      setTourIndex(0);
      dialog.showModal();
    } else if (!tourOpen && dialog.open) dialog.close();
  }, [tourOpen]);

  const moveTour = direction => setTourIndex(index => (index + direction + tourItems.length) % tourItems.length);

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onCloseOrder();
  }

  return (
    <>
      <dialog ref={orderRef} className="info-dialog" aria-labelledby="order-dialog-title"
        onClose={onCloseOrder} onCancel={onCloseOrder} onClick={closeOnBackdrop}>
        <button type="button" className="dialog-close" aria-label="Close" onClick={onCloseOrder}>×</button>
        <span className="dialog-icon" aria-hidden="true">✦</span>
        <h2 id="order-dialog-title">A good choice.</h2>
        <p>{selection && <>
          <span className="order-summary">{selection.colour === 'white' ? 'White' : 'Brown'} eggs · Pack of {selection.count} · ₹{selection.price}</span>
          <br /><br />Online checkout is not available yet. Your selection is ready for when ordering opens.
        </>}</p>
        <button type="button" className="dialog-done" onClick={onCloseOrder}>Got it</button>
      </dialog>
      <dialog ref={tourRef} className="tour-dialog" aria-labelledby="tour-dialog-title"
        onClose={onCloseTour} onCancel={onCloseTour}
        onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            moveTour(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}>
        <button type="button" className="tour-close" aria-label="Close farm tour" onClick={onCloseTour}>×</button>
        <p className="eyebrow">A peek at the poultry</p>
        <h2 id="tour-dialog-title" className="tour-title">{tour.title}</h2>
        <img className="tour-image" src={tour.src} alt={tour.alt} />
        <div className="tour-controls">
          <button type="button" className="tour-prev" aria-label="Previous tour image" onClick={() => moveTour(-1)}>←</button>
          <p className="tour-caption">{tour.caption}</p>
          <button type="button" className="tour-next" aria-label="Next tour image" onClick={() => moveTour(1)}>→</button>
        </div>
        <small>Illustrative farm imagery.</small>
      </dialog>
    </>
  );
}
