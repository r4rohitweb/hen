import React from 'react';

export default function ColourToggle({ colour, onChange, care = false }) {
  return (
    <div className={`egg-toggle${care ? ' care-toggle' : ''}`} role="group"
      aria-label={care ? 'Preview carton egg colour' : 'Choose egg colour'}>
      {['brown', 'white'].map(value => (
        <button key={value} type="button" data-colour={value}
          className={colour === value ? 'is-active' : ''}
          aria-pressed={colour === value} onClick={() => onChange(value)}>
          <span className={`tiny-egg ${value}-dot`} aria-hidden="true" />
          {value === 'white' ? 'White' : 'Brown'}
        </button>
      ))}
    </div>
  );
}
