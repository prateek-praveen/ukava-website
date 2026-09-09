import { reveal, type RevealVariant } from "@/lib/reveal";

/**
 * Wrapper form of the reveal, for the two places that already had a
 * container of their own to animate. Everywhere else spreads `reveal()`
 * onto an element that exists, which adds no node at all — prefer that.
 *
 * No observer here: RevealProvider runs one for the whole document, so this
 * is a plain server component that renders a div with an attribute on it.
 */
export default function Reveal({
  children,
  className,
  variant = "heading",
  index = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  index?: number;
  as?: "div" | "section";
}) {
  return (
    <Tag className={className} {...reveal(variant, index)}>
      {children}
    </Tag>
  );
}
