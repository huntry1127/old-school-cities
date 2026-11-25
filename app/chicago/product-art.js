export default function ProductArt({ product }) {
  if (!product.artwork) return null;
  const { src, alt, width, height } = product.artwork;
  return <img className="chicago-product-image" src={src} alt={alt} width={width} height={height} />;
}
