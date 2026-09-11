import Link from 'next/link';
import { products } from '../../lib/products';

function ProductCard({ product }) {
  return <article className="product-card"><Link href={`/chicago/product/${product.slug}`} className="product-art" aria-label={product.name}><div className="art-copy"><span>{product.collection}</span><strong>{product.name}</strong><small>Chicago, Illinois</small></div></Link><div className="product-meta"><div><span className="eyebrow">{product.collection}</span><h3>{product.name}</h3></div><strong>${product.price}</strong></div></article>;
}

export default function ChicagoPage() {
  return <main>
    <header className="site-header chicago-header"><Link href="/chicago" className="wordmark">CHICAGO OLD SCHOOL</Link><nav><Link href="/">All Cities</Link><Link href="/chicago/shop">Shop</Link><a href="#story">Story</a></nav></header>
    <section className="hero"><div className="hero-kicker">Sports · Neighborhoods · Traditions · Good Times</div><h1>Made for the city<br/>that remembers.</h1><p>Original Chicago-inspired apparel built around the games, streets, bars, weather, and stories that made the city what it is.</p><div className="hero-actions"><Link className="button button-light" href="/chicago/shop">Shop the first drop</Link><a className="text-link" href="#story">Our story →</a></div><div className="hero-poster"><span>SAME CITY.</span><strong>DIFFERENT ERA.</strong><em>BETTER STORIES.</em></div></section>
    <section className="drop-section" id="archive"><div className="section-heading"><div><span className="eyebrow">Drop 001</span><h2>From the archives</h2></div><Link href="/chicago/shop">View all pieces →</Link></div><div className="product-grid">{products.slice(0, 3).map(p => <ProductCard key={p.slug} product={p} />)}</div></section>
    <section className="story" id="story"><div className="story-sign">SOLDIER FIELD →</div><div><span className="eyebrow">More than a game</span><h2>Chicago sports live outside the stadium.</h2><p>They live in neighborhood bars, family stories, frozen parking lots, summer afternoons, elevated trains, and the same lucky shirt somebody has worn for twenty years.</p><p>Chicago Old School is built around those memories—not official team merchandise, but original pieces inspired by the culture surrounding the games.</p></div></section>
    <section className="manifesto"><p>Same city.</p><p>Different era.</p><p>Better stories.</p></section>
    <section className="newsletter"><span className="eyebrow">Join the old school</span><h2>New drops. Old stories.</h2><form action="#"><input type="email" placeholder="Email address" aria-label="Email address"/><button>Join the list</button></form></section>
    <footer><strong>CHICAGO OLD SCHOOL™</strong><span>Part of Old School Cities · Chicago, Illinois</span></footer>
  </main>;
}
