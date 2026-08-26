"use client";

import Link from "next/link";
import styles from "./CategoryTabs.module.css";
import { CATEGORIES, categoryHref, type CategoryKey } from "@/lib/catalogue";

type Props = {
  active: CategoryKey;
  /** Homepage tabs swap a panel in place; listing tabs navigate. */
  onSelect?: (key: CategoryKey) => void;
  className?: string;
};

export default function CategoryTabs({ active, onSelect, className }: Props) {
  return (
    <div
      className={`hscroll ${styles.tabs} ${className || ""}`}
      role={onSelect ? "tablist" : undefined}
    >
      {CATEGORIES.map((c) => {
        const cls = `${styles.tab} ${c.key === active ? styles.on : ""}`;
        return onSelect ? (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={c.key === active}
            onClick={() => onSelect(c.key)}
            className={cls}
          >
            {c.label}
          </button>
        ) : (
          <Link
            key={c.key}
            href={categoryHref(c.key)}
            aria-current={c.key === active ? "page" : undefined}
            className={cls}
          >
            {c.label}
          </Link>
        );
      })}
    </div>
  );
}
