import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingPage from "../ListingPage";
import { CATEGORIES, isCategoryKey } from "@/lib/catalogue";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.key === category);
  if (!cat) return {};
  return { title: cat.label, description: cat.intro };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  if (!isCategoryKey(category)) notFound();
  return <ListingPage active={category} />;
}
