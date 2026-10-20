import type { ReactNode } from "react";
import styles from "./BrowserFrame.module.scss";

interface BrowserFrameProps {
  host: string;
  children: ReactNode;
}

export default function BrowserFrame({ host, children }: BrowserFrameProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}><i /><i /><i /></span>
        <span className={styles.host}>{host}</span>
      </div>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
