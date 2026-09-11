import { redirect } from 'next/navigation';
export default async function ProductPage({ params }) { const { slug } = await params; redirect(`/chicago/product/${slug}`); }
