import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClosingCta from "@/components/ClosingCta";
import { PRODUCTS, findProduct } from "@/lib/catalogue";
import { productCopy } from "@/lib/productCopy";

type Params = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.cat, slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  return { title: product.name, description: productCopy(product).tagline };
}

export default async function ProductPage({ params }: Params) {
  const { category, slug } = await params;
  const product = findProduct(slug);
  // Guard the category segment too, so only the canonical URL renders.
  if (!product || product.cat !== category) notFound();

  return (
    <>
      <SiteHeader active="products" />
      <main>
        <ProductDetail product={product} />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
