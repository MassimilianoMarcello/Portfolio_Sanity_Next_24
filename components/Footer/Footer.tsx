import styles from "./Footer.module.scss";
import Link from "next/link";

const LINKS = [
  { label: "Email",    href: "mailto:massdevone@gmail.com",                                        external: false },
  { label: "GitHub",   href: "https://github.com/massimilianomarcello",                            external: true  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/massimiliano-marcello-4195681a7",        external: true  },
  { label: "Twitter",  href: "https://x.com/MassDev",                                             external: true  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <span className={styles.copy}>
          &copy; {new Date().getFullYear()} Massimiliano Marcello
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

        <span className={styles.location}>Brussels</span>

      </div>
    </footer>
  );
};

export default Footer;

