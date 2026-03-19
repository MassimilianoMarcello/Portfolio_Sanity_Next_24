"use client";

// app/(pages)/blog_post/[slug]/TableOfContents.tsx

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "../blog.module.scss";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId]     = useState<string>("");
  const [isOpen, setIsOpen]         = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Active heading via IntersectionObserver ────────────────────────────────
  useEffect(() => {
    if (!items.length) return;

    const headingEls = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  // ── Back-to-top visibility ────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Offset per la navbar fissa — modifica NAVBAR_HEIGHT in base all'altezza reale
    const NAVBAR_HEIGHT = 74;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
    setIsOpen(false);
  }, []);

  if (!items.length) return null;

  return (
    <>
      {/* ── TOC block ──────────────────────────────────────────────────── */}
      <div className={styles.toc}>

        {/* Header — always visible, toggles on mobile */}
        <button
          className={styles.tocHeader}
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
        >
          <span className={styles.tocLabel}>Contents</span>
          <svg
            className={`${styles.tocChevron} ${isOpen ? styles.tocChevronOpen : ""}`}
            width="10" height="10" viewBox="0 0 10 10" fill="none"
          >
            <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Item list */}
        <nav className={`${styles.tocNav} ${isOpen ? styles.tocNavOpen : ""}`} aria-label="Table of contents">
          <ol className={styles.tocList}>
            {items.map((item) => (
              <li
                key={item.id}
                className={`${styles.tocItem} ${item.level === 3 ? styles.tocItemH3 : ""}`}
              >
                <button
                  className={`${styles.tocLink} ${activeId === item.id ? styles.tocLinkActive : ""}`}
                  onClick={() => handleClick(item.id)}
                >
                  {item.level === 3 && (
                    <span className={styles.tocIndentDot} aria-hidden="true" />
                  )}
                  <span className={styles.tocLinkText}>{item.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* ── Back to top — fixed, mobile only ──────────────────────────── */}
      <button
        className={`${styles.backToTop} ${showBackTop ? styles.backToTopVisible : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 10V2M2 6L6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Top</span>
      </button>
    </>
  );
};

export default TableOfContents;