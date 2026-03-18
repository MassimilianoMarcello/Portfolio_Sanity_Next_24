import React from "react";
import styles from "./RepoAndWebSiteButtons.module.scss";
import Link from "next/link";

interface RepoAndWebSiteButtonsProps {
  githubUrl: string;
  url: string;
  isAbsolute?: boolean;
  bottom?: string;
  right?: string;
}

const RepoAndWebSiteButtons: React.FC<RepoAndWebSiteButtonsProps> = ({
  githubUrl,
  url,
  isAbsolute = false,
  bottom = "10px",
  right = "10px",
}) => {
  return (
    <div
      className={`${styles.buttons} ${isAbsolute ? styles.absolutePosition : ""}`}
      style={isAbsolute ? { bottom, right } : {}}
    >
      <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
        <span className={styles.marker}>▪</span>
        GitHub ↗
      </Link>
      <Link href={url} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
        <span className={styles.marker}>▪</span>
        Live site ↗
      </Link>
    </div>
  );
};

export default RepoAndWebSiteButtons;
