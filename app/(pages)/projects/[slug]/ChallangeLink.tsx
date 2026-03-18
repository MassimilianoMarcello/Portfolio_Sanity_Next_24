import Link from "next/link";
import styles from "./singleProject.module.scss";

type ChallengeProps = {
  challengeId: string;
  title: string;
};

// Pure anchor — no JS needed, browser handles scroll natively via #hash
const ChallengeLink = ({ challengeId, title }: ChallengeProps) => (
  <li className={styles.challengeListItem}>
    <Link href={`#${challengeId}`} className={styles.challengeNavLink}>
      <span className={styles.navMarker} aria-hidden="true">▪</span>
      {title}
    </Link>
  </li>
);

export default ChallengeLink;


