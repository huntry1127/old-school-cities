import Link from 'next/link';
import './detroit.css';

export const metadata = {
  title: 'Detroit Collection',
  description: 'Explore the Detroit What Tee from Old School Cities, with a winged tiger-horse emblem and Old English lettering.'
};

export default function DetroitPage() {
  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark">Old School Cities</Link>
        <nav aria-label="Detroit collection navigation"><Link href="/">All Cities</Link></nav>
      </header>
      <main className="detroit-collection">
        <header className="detroit-intro">
          <h1>Detroit Collection</h1>
        </header>
        <article className="detroit-tee" aria-labelledby="detroit-what">
          <div className="detroit-tee-copy">
            <h2 id="detroit-what">Detroit What Tee</h2>
            <p>A black heavyweight drop-shoulder tee with a winged tiger-horse emblem on the front and cream Old English “Detroit Baby...” lettering just above the back hem.</p>
            <p className="detroit-availability">Coming soon</p>
          </div>
          <div className="detroit-gallery">
            <figure>
              <img src="/detroit/detroit-what-front.webp" width="1000" height="1039" alt="Black tee with cream Detroit What lettering above an orange tiger-horse with a blue mane and red wings" />
              <figcaption>Front</figcaption>
            </figure>
            <figure>
              <img src="/detroit/detroit-what-back.webp" width="1000" height="1039" alt="Back of black tee with straight cream Old English Detroit Baby lettering and three dots above the hem" />
              <figcaption>Back</figcaption>
            </figure>
          </div>
        </article>
      </main>
    </>
  );
}
