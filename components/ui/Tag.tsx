import type { ReactNode } from "react";
import styles from "./Tag.module.scss";

/** Metadato non interattivo (nessun hover: non è cliccabile). Il maiuscolo è solo CSS. */
export default function Tag({ children }: { children: ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}
