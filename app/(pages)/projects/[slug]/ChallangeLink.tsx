"use client";
// app/(pages)/projects/[slug]/ChallangeLink.tsx
import { useCallback } from "react";
import styles from "./singleProject.module.scss";

type ChallengeProps = {
  challengeId: string;
  title:       string;
};

// Modifica NAVBAR_HEIGHT con l'altezza reale della tua navbar in px
const NAVBAR_HEIGHT = 74;

const ChallengeLink = ({ challengeId, title }: ChallengeProps) => {
  const handleClick = useCallback(() => {
    const el = document.getElementById(challengeId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  }, [challengeId]);

  return (
    <li className={styles.challengeListItem}>
      <button className={styles.challengeNavLink} onClick={handleClick}>
        <span className={styles.navMarker} aria-hidden="true">▪</span>
        {title}
      </button>
    </li>
  );
};

export default ChallengeLink;


