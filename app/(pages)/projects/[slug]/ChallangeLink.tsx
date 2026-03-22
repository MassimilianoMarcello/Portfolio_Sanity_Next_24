"use client";
// app/(pages)/projects/[slug]/ChallangeLink.tsx
import { useCallback, useEffect, useState } from "react";
import styles from "./singleProject.module.scss";

type ChallengeProps = {
  challengeId: string;
  title:       string;
};

const NAVBAR_HEIGHT = 74;

const ChallengeLink = ({ challengeId, title }: ChallengeProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = document.getElementById(challengeId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      {
        rootMargin: `-${NAVBAR_HEIGHT}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [challengeId]);

  const handleClick = useCallback(() => {
    const el = document.getElementById(challengeId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  }, [challengeId]);

  return (
    <li className={styles.challengeListItem}>
      <button
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


