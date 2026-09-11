import Link from 'next/link';
import { cities } from '../lib/cities';

export default function HomePage() {
  return (
    <main className="cities-home">
      <header className="parent-header">
        <Link href="/" className="parent-wordmark">OLD SCHOOL CITIES</Link>
        <nav aria-label="Primary navigation"><a href="#cities">Cities</a><a href="#about">About</a></nav>
      </header>
      <section className="cities-hero">
        <div className="cities-hero-copy"><span className="eyebrow">Sports · Neighborhoods · Traditions · Good Times</span><h1>The cities<br/>you remember.</h1><p>Original apparel inspired by the streets, stadiums, corner bars, and stories that make a city feel like home.</p><a className="button button-light" href="#cities">Choose your city</a></div>
        <div className="ticket" aria-hidden="true"><span>ADMIT ONE</span><strong>OLD SCHOOL</strong><small>LOCAL STORIES · FOREVER</small></div>
      </section>
      <section className="city-index" id="cities">
        <div className="section-heading">
          <div><span className="eyebrow">City No. 01</span><h2>Start in Chicago</h2></div><span className="index-note">More cities are on the way.</span>
        </div>
        {cities.map((city) => <Link href={`/${city.slug}`} className="city-card" key={city.slug}><div className="city-number">01</div><div><span className="eyebrow">Now open</span><h3>{city.name} <em>Old School</em></h3><p>{city.shortTagline}</p></div><span className="city-arrow">Enter the city →</span></Link>)}
      </section>
      <section className="parent-story" id="about"><span className="eyebrow">Why Old School Cities</span><h2>Not team merchandise.<br/>City memory in shirt form.</h2><p>Every collection starts with the rituals locals know by heart—the route to the stadium, the neighborhood place before the game, the weather nobody else understands, and the stories that get better every year.</p></section>
      <footer className="parent-footer"><strong>OLD SCHOOL CITIES™</strong><span>Made for the cities that remember.</span></footer>
    </main>
  );
}
