"use client";
// app/(pages)/projects/[slug]/ChallangeLink.tsx
import { useCallback, useEffect, useState } from "react";
import styles from "./singleProject.module.scss";

type ChallengeProps = {
  challengeId: string;
  title:       string;
};

// Legge l'altezza reale dal token CSS (--navbar-height): niente numero duplicato nel JS
const getNavbarHeight = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navbar-height")) || 72;

const ChallengeLink = ({ challengeId, title }: ChallengeProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = document.getElementById(challengeId);
    if (!el) return;

    const navbarHeight = getNavbarHeight();
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      {
        rootMargin: `-${navbarHeight}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [challengeId]);

  const handleClick = useCallback(() => {
    const el = document.getElementById(challengeId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getNavbarHeight();
    window.scrollTo({ top, behavior: "smooth" });
  }, [challengeId]);

  return (
    <li className={styles.challengeListItem}>
      <button
        type="button"
        aria-current={isActive ? "true" : undefined}
        className={`${styles.challengeNavLink} ${isActive ? styles.challengeNavLinkActive : ''}`}
        onClick={handleClick}
      >
        <span className={styles.navMarker} aria-hidden="true">▪</span>
        {title}
      </button>
    </li>
  );
};

export default ChallengeLink;


