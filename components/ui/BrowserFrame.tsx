import type { ReactNode } from "react";
import styles from "./BrowserFrame.module.scss";

interface BrowserFrameProps {
  children: ReactNode;
  /** "browser": barra con host (siti live). "bare": solo cornice, per librerie/componenti/progetti senza URL. */
  variant?: "browser" | "bare";
  host?: string;
}

export default function BrowserFrame({ children, variant = "browser", host }: BrowserFrameProps) {
  return (
    <div className={styles.frame} data-variant={variant}>
      {variant === "browser" && (
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.dots}><i /><i /><i /></span>
          <span className={styles.host}>{host}</span>
        </div>
      )}
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
