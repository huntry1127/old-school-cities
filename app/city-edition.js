import Link from 'next/link';

function EditionStory({ story, lead }) {
  const Heading = lead ? 'h1' : 'h2';
  return (
    <article id={story.id} className={lead ? 'edition-story edition-lead' : 'edition-story edition-secondary'}>
      <header className="edition-headline">
        <Heading>{story.headline}</Heading>
        <p>{story.deck}</p>
      </header>
      <div className="edition-spread">
        <figure className="edition-art">
          <img src={story.artwork.src} alt={story.artwork.alt} width={story.artwork.width}
            height={story.artwork.height} loading={lead ? 'eager' : 'lazy'} />
          <figcaption>{story.artwork.caption}</figcaption>
        </figure>
        <div className="edition-copy">
          {story.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {story.source && <a className="edition-source" href={story.source.href}>{story.source.label}</a>}
          <Link className="edition-cta" href={story.href}>View the tee</Link>
        </div>
      </div>
    </article>
  );
}

export default function CityEdition({ city, shopHref, etsyHref, stories }) {
  return (
    <div className="city-edition">
      <header className="edition-masthead">
        <div className="edition-name">
          <span>{city} Edition</span>
          <Link href="/" aria-label="Old School Cities home">Old School Cities</Link>
          <p>Vintage graphic tees inspired by local stories.</p>
        </div>
        <nav aria-label={city + ' edition navigation'}>
          <Link href="/">Explore the globe</Link>
          <Link href="/chicago">Chicago Drop</Link>
          <Link className="edition-shop" href={shopHref}>Shop the {city} drop</Link>
        </nav>
      </header>
      <main aria-label={city + ' Edition'}>
        {stories.map((story, index) => (
          <EditionStory key={story.href} story={story} lead={index === 0} />
        ))}
      </main>
      <footer className="edition-footer">
        <Link href="/">Old School Cities</Link>
        <p>Same City. Different Era. Better Stories.</p>
        <a href={etsyHref}>Shop on Etsy</a>
      </footer>
    </div>
  );
}
