import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Apre in nuova scheda con rel sicuro. */
  external?: boolean;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  "aria-label"?: string;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "ghost",
  external,
  icon,
  iconAfter,
  className,
  ...rest
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cx(styles.button, className)}
      data-variant={variant}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {icon}
      {children}
      {iconAfter}
    </Link>
  );
}
