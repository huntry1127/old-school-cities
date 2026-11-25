import Link from 'next/link';
import DropCarousel from './drop-carousel';
import { getProduct } from '../../lib/products';
import './drop.css';

export const metadata = {
  title: 'The Chicago Drop',
  description: 'Explore The Loop, the Great Chicago Fire, and Pizza Showdown. Read the stories behind the Chicago Drop.'
};

const features = [
  {
    slug: 'the-loop',
    headline: 'The Chicago Drop',
    description: 'The Loop tee takes its cue from the tracks, theaters, and skyline that make downtown unmistakably Chicago.',
    story: 'story',
    palette: 'loop'
  },
  {
    slug: 'the-great-chicago-fire',
    headline: 'The Chicago Fire',
    description: 'Mrs. O’Leary’s cow gets a monster-movie remake in our take on one of Chicago’s most enduring legends.',
    story: 'archive',
    palette: 'fire'
  },
  {
    slug: 'pizza-showdown',
    headline: 'Pizza Showdown',
    description: 'The Sears Tower and the Empire State Building square off, and Chicago brings the deep dish.',
    story: 'pizza-showdown',
    palette: 'pizza'
  }
].map(feature => ({ ...feature, product: getProduct(feature.slug) }));

export default function ChicagoDropPage() {
  return (
    <div className="chicago-drop">
      <header className="drop-masthead">
        <div className="drop-brand">
          <Link href="/" aria-label="Old School Cities home">Old School<br />Cities</Link>
          <p>Vintage graphic tees inspired by local stories</p>
        </div>
        <nav aria-label="Chicago Drop navigation">
          <Link href="/">Cities</Link>
          <Link href="/chicago" aria-current="page">Chicago</Link>
          <Link href="/chicago/shop">Shop</Link>
          <Link href="/chicago/edition">Newspaper</Link>
        </nav>
      </header>
      <main>
        <h1 className="drop-sr-only">The Chicago Drop</h1>
        <DropCarousel features={features} />
        <section className="drop-featured" aria-labelledby="drop-featured-title">
          <h2 id="drop-featured-title">Featured Chicago Tees</h2>
          <div className="drop-grid">
            {features.map(({ product }) => (
              <Link href={`/chicago/product/${product.slug}`} className="drop-product" key={product.slug}>
                <img src={product.artwork.src} alt="" width={product.artwork.width} height={product.artwork.height} loading="lazy" />
                <strong>{product.name}</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
