import type { ElementType, ReactNode } from "react";
import styles from "./Eyebrow.module.scss";

export type EyebrowVariant = "default" | "accent" | "muted";

interface EyebrowProps {
  children: ReactNode;
  variant?: EyebrowVariant;
  as?: ElementType;
  id?: string;
}

/** Etichetta sopra un blocco (Problem, Solution, Impact, Key challenges, categoria). */
export default function Eyebrow({ children, variant = "default", as: Tag = "span", id }: EyebrowProps) {
  return (
    <Tag id={id} className={styles.eyebrow} data-variant={variant}>
      {children}
    </Tag>
  );
}
