'use client';

import { useEffect, useRef } from 'react';
import { mountGlobe } from './globe';

export default function GlobeHome() {
  const root = useRef(null);
  useEffect(() => mountGlobe(root.current), []);

  return (
    <div className="globe-landing" ref={root}>
      <header id="top">
      <a className="wordmark" href="#top" aria-label="Old School Cities home">OLD SCHOOL<span>CITIES</span></a>
      <nav aria-label="Main navigation"><a href="/shop">Shop</a><a href="#about" id="about-link">About</a></nav>
      </header>
      <main>
      <section className="stage" aria-label="Explore the cities">
      <canvas id="globe" tabIndex="0" aria-label="Interactive globe. Use arrow keys to rotate, plus and minus to zoom, and Home to reset."></canvas>
      <div className="intro"><h1>Every city<br /><i>has a story.</i></h1><p>Same City. Different Era. Better Stories.</p></div>
      <canvas id="guides" aria-hidden="true"></canvas>
      <div id="markers"></div>
      <div id="selection" hidden><strong></strong><span></span><button id="dismiss" aria-label="Clear selected city">×</button></div>
      <p className="tip">Drag to rotate. Pick a landmark to explore.</p>
      <div className="controls" aria-label="Globe controls"><button id="out" aria-label="Zoom out">−</button><button id="in" aria-label="Zoom in">+</button><button id="reset" aria-label="Reset globe view" title="Reset globe view">⟲</button></div>
      </section>
      <nav className="city-nav" id="cities" aria-label="Explore city collections" tabIndex="-1"></nav>
      </main>
      <dialog id="about" aria-labelledby="about-title"><h2 id="about-title">Old School Cities</h2><p>Vintage-inspired graphic tees rooted in the buildings, local legends, and stories that give each city its character.</p><form method="dialog"><button>Close</button></form></dialog>
    </div>
  );
}
