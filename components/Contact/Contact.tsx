import Link from "next/link";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { SITE } from "@/lib/site";
import styles from "./Contact.module.scss";

interface ContactLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

interface ContactBlock {
  kicker: string;
  title: string;
  desc: string;
  links: ContactLink[];
  cta: { label: string; href: string; variant: "primary" | "ghost"; external?: boolean };
}

const BLOCKS: ContactBlock[] = [
  {
    kicker: "Get in touch",
    title: "Let’s talk",
    desc: "Open to projects, collaborations, and opportunities. I read every message.",
    links: [
      { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
      { label: "LinkedIn", value: "massimiliano-marcello", href: SITE.linkedin, external: true },
    ],
    cta: { label: "Send a message", href: `mailto:${SITE.email}`, variant: "primary" },
  },
  {
    kicker: "Code",
    title: "See the work",
    desc: "All projects, contributions, and experiments live on GitHub.",
    links: [
      { label: "GitHub", value: "massimilianomarcello", href: SITE.github, external: true },
      { label: "Twitter", value: "@massdev", href: SITE.twitter, external: true },
    ],
    cta: { label: "View GitHub profile", href: SITE.github, variant: "ghost", external: true },
  },
];

const Contact = () => {
  return (
    <section className={styles.contactContainer} id="contact" aria-label="Contact">
      <div className={styles.sectionKicker}>
        <span>Contact</span>
      </div>

      <div className={styles.contactGrid}>
        {/* Colonna sinistra vuota: allinea il contenuto alle card dei progetti */}
        <div className={styles.contactSpacer} />

        <div className={styles.contactBlocks}>
          {BLOCKS.map((block) => (
            <div key={block.kicker} className={styles.contactBlock}>
              <Eyebrow>{block.kicker}</Eyebrow>
              <h2 className={styles.blockTitle}>{block.title}</h2>
              <p className={styles.blockDesc}>{block.desc}</p>

              <div className={styles.linkList}>
                {block.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={styles.contactLink}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className={styles.linkLabel}>{link.label}</span>
                    <span className={styles.linkValue}>{link.value}</span>
                  </Link>
                ))}
              </div>

              <div className={styles.actions}>
                <Button
                  href={block.cta.href}
                  variant={block.cta.variant}
                  external={block.cta.external}
                  iconAfter={<ArrowUpRightIcon />}
                >
                  {block.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
