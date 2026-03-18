import React from "react";
import styles from "./RepoAndWebSiteButtons.module.scss";
import Link from "next/link";
import Image from "next/image";

interface RepoAndWebSiteButtonsProps {
  githubUrl: string;
  url: string;
  isAbsolute?: boolean; // Se true, posizione assoluta
  bottom?: string;
  right?: string;
}

const RepoAndWebSiteButtons: React.FC<RepoAndWebSiteButtonsProps> = ({
  githubUrl,
  url,
  isAbsolute = false, // Default: posizione relativa
  bottom = "10px",
  right = "10px",
}) => {
  return (
    <div
      className={`${styles.visitRepoAndWebsiteButtons} ${
        isAbsolute ? styles.absolutePosition : ""
      }`}
      style={isAbsolute ? { bottom, right } : {}}
    >
      <div className={styles.styledButtonGit}>
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
         <span className={styles.github}>GitHub</span> 
          <Image src="/github.svg" alt="GitHub" width={28} height={28} />
        </Link>
      </div>
      <div className={styles.styledButtonWebsite}>
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <span>Visit Website</span>
          <Image src="/forward.svg" alt="Website" width={20} height={20} />
        </Link>
      </div>
    </div>
  );
};

export default RepoAndWebSiteButtons;
