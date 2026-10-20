// app/design-system/page.tsx — documentazione viva dei token e dei componenti del sito
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import StatusPill from "@/components/ui/StatusPill";
import Tag from "@/components/ui/Tag";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/ui/icons";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Design system",
  description: "Token e componenti usati da questo portfolio.",
};

const COLORS = [
  "bg-page", "bg-surface", "bg-accent", "bg-elevated",
  "border", "border-strong", "border-brand", "border-accent",
  "text", "text-muted", "heading", "brand", "brand-strong",
  "action", "action-hover", "success", "warning",
];

const TYPE = [
  ["text-xs", "12px — label, tag, metadati"],
  ["text-sm", "14px — testo di card"],
  ["text-md", "16px — testo corrente"],
  ["text-lg", "20px — titolo card"],
  ["text-xl", "24px — titolo sezione"],
] as const;

const SPACE = ["space-1", "space-2", "space-3", "space-4", "space-5", "space-6", "space-7", "space-8"];

export default function DesignSystemPage() {
  return (
    <main className={styles.page}>
      <header>
        <h1 className={styles.h1}>Design system</h1>
        <p className={styles.lead}>
          Ogni valore qui sotto è una custom property CSS definita in <code>app/design-tokens.scss</code>.
          I componenti leggono solo questi token: cambiarne uno cambia il sito.
        </p>
      </header>

      <section aria-labelledby="colors">
        <h2 id="colors" className={styles.h2}>Colore</h2>
        <ul className={styles.swatches}>
          {COLORS.map((name) => (
            <li key={name} className={styles.swatch}>
              <span className={styles.chip} style={{ background: `var(--color-${name})` }} />
              <code>--color-{name}</code>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type">
        <h2 id="type" className={styles.h2}>Tipografia</h2>
        <ul className={styles.rows}>
          {TYPE.map(([token, note]) => (
            <li key={token} className={styles.row}>
              <code>--{token}</code>
              <span style={{ fontSize: `var(--${token})` }}>The quick brown fox</span>
              <small>{note}</small>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="space">
        <h2 id="space" className={styles.h2}>Spaziatura</h2>
        <ul className={styles.rows}>
          {SPACE.map((token) => (
            <li key={token} className={styles.row}>
              <code>--{token}</code>
              <span className={styles.bar} style={{ width: `var(--${token})` }} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="components">
        <h2 id="components" className={styles.h2}>Componenti</h2>

        <h3 className={styles.h3}>Eyebrow</h3>
        <div className={styles.demo}>
          <Eyebrow>Default</Eyebrow>
          <Eyebrow variant="accent">Accent</Eyebrow>
          <Eyebrow variant="muted">Muted</Eyebrow>
        </div>

        <h3 className={styles.h3}>Tag</h3>
        <div className={styles.demo}><Tag>Next.js</Tag><Tag>TypeScript</Tag><Tag>Sanity</Tag></div>

        <h3 className={styles.h3}>StatusPill</h3>
        <div className={styles.demo}>
          <StatusPill status="live" />
          <StatusPill status="wip" />
          <StatusPill status="archived" />
        </div>

        <h3 className={styles.h3}>Button</h3>
        <div className={styles.demo}>
          <Button href="#components" variant="primary" iconAfter={<ArrowUpRightIcon />}>Primary</Button>
          <Button href="#components" icon={<GitHubIcon />}>Ghost</Button>
        </div>
      </section>
    </main>
  );
}
