'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DropCarousel({ features }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const feature = features[index];
  const artwork = feature.product.artwork;

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => setPlaying(!reducedMotion.matches);
    updatePlayback();
    reducedMotion.addEventListener('change', updatePlayback);
    if (window.location.hash === '#story' || window.location.hash === '#archive') {
      window.location.replace('/chicago/edition' + window.location.hash);
    }
    return () => reducedMotion.removeEventListener('change', updatePlayback);
  }, []);

  useEffect(() => {
    if (!playing || hovering || focused) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % features.length), 7500);
    return () => window.clearInterval(timer);
  }, [playing, hovering, focused, features.length]);

  function select(next) {
    setIndex((next + features.length) % features.length);
    setPlaying(false);
  }

  return (
    <section className="drop-carousel" aria-label="Featured tee designs" aria-roledescription="carousel">
      <div className={`drop-hero drop-hero--${feature.palette}`} aria-live={playing ? 'off' : 'polite'}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setHovering(true); }}
        onPointerLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className="drop-copy">
          <p className="drop-kicker">Old School Cities</p>
          <h2>{feature.headline}</h2>
          <p>{feature.description}</p>
          <Link className="drop-cta" href={`/chicago/edition#${feature.story}`}>Read All About It</Link>
        </div>
        <div className="drop-artwork">
          <img src={artwork.src} alt={artwork.alt} width={artwork.width} height={artwork.height} fetchPriority={index === 0 ? 'high' : 'auto'} />
        </div>
      </div>
      <div className="drop-controls" aria-label="Slideshow controls">
        <button type="button" onClick={() => select(index - 1)} aria-label="Previous design">‹</button>
        {features.map(({ slug, product }, i) => (
          <button type="button" key={slug} className="drop-dot" aria-label={product.name}
            aria-pressed={index === i} onClick={() => select(i)}><span aria-hidden="true" /></button>
        ))}
        <button type="button" onClick={() => select(index + 1)} aria-label="Next design">›</button>
        <button type="button" className="drop-play" onClick={() => setPlaying(value => !value)}>
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </section>
  );
}
