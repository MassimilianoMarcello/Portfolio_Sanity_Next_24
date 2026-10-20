import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.scss";

const LINKS = [
  { label: "Email",    href: `mailto:${SITE.email}`, external: false },
  { label: "GitHub",   href: SITE.github,            external: true  },
  { label: "LinkedIn", href: SITE.linkedin,          external: true  },
  { label: "Twitter",  href: SITE.twitter,           external: true  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>
          &copy; {new Date().getFullYear()} {SITE.name}
        </span>

        <nav className={styles.links} aria-label="Social links">
          {LINKS.map(({ label, href, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={styles.link}
            >
              {label}
            </Link>
          ))}
        </nav>

        <span className={styles.location}>{SITE.city}</span>
      </div>
    </footer>
  );
};

export default Footer;
