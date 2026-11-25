import Link from 'next/link';
import ProductArt from '../product-art';
import { etsyShopUrl, products } from '../../../lib/products';
import '../product-art.css';

export default function ShopPage() {
  return (
    <main>
      <header className="site-header">
        <Link href="/chicago" className="wordmark">Chicago Old School</Link>
        <nav><Link href="/">All Cities</Link><Link href="/chicago/edition">Chicago Edition</Link></nav>
      </header>
      <section className="shop-intro">
        <span className="eyebrow">Drop 001</span>
        <h1>The First Drop</h1>
        <p>Original apparel inspired by Chicago stories. Visit our Etsy shop for current availability.</p>
        <a className="button button-dark" href={etsyShopUrl}>Shop all on Etsy</a>
      </section>
      <section className="product-grid shop-grid">
        {products.map(product => (
          <article className="product-card" key={product.slug}>
            <Link href={`/chicago/product/${product.slug}`} aria-label={product.name}
              className={product.artwork ? 'product-art has-artwork' : 'product-art'}>
              {product.artwork ? <ProductArt product={product} /> : (
                <div className="art-copy">
                  <span>{product.collection}</span><strong>{product.name}</strong><small>{product.color}</small>
                </div>
              )}
            </Link>
            <div className="product-meta">
              <div><span className="eyebrow">{product.collection}</span><h3>{product.name}</h3></div>
              {product.price != null && <strong>${product.price}</strong>}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
