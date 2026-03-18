'use client';

import styles from "./singleProject.module.scss";

type ChallengeProps = {
  challengeId: string;
  title: string;
};

const ChallengeLink = ({ challengeId, title }: ChallengeProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(challengeId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <li className={styles.challengeListItem}>
      <a href={`#${challengeId}`} onClick={handleClick} className={styles.challengeNavLink}>
        <span className={styles.navMarker}>▪</span>
        {title}
      </a>
    </li>
  );
};

export default ChallengeLink;


