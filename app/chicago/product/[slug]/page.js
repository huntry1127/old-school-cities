import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductArt from '../../product-art';
import { etsyShopUrl, products, getProduct } from '../../../../lib/products';
import '../../product-art.css';

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main>
      <header className="site-header">
        <Link href="/chicago" className="wordmark">Chicago Old School</Link>
        <nav><Link href="/chicago/shop">Shop</Link></nav>
      </header>
      <section className="product-page">
        <div className={product.artwork ? 'product-hero-art has-artwork' : 'product-hero-art'}>
          {product.artwork ? <ProductArt product={product} /> : (
            <div className="art-copy large">
              <span>{product.collection}</span><strong>{product.name}</strong><small>Chicago · Est. Always</small>
            </div>
          )}
        </div>
        <div className="product-info">
          <span className="eyebrow">{product.collection}</span>
          <h1>{product.name}</h1>
          {product.price != null && <div className="price">${product.price}.00</div>}
          <p>{product.description}</p>
          {product.color && <div className="detail-row"><span>Color</span><strong>{product.color}</strong></div>}
          {product.color && <div className="detail-row"><span>Fulfillment</span><strong>Printed to order</strong></div>}
          <a className="button button-dark full" href={product.etsyUrl ?? etsyShopUrl}>
            {product.etsyUrl ? 'Buy on Etsy' : 'Visit our Etsy shop'}
          </a>
          <small className="checkout-note">
            {product.etsyUrl ? 'Choose your size and check out on Etsy.' : 'This design does not have an active Etsy listing yet.'}
          </small>
        </div>
      </section>
    </main>
  );
}
