import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import { zf } from "../styles/fonts";
// @ts-expect-error Next.js bundles global SCSS imports without TypeScript declarations.
import "./design-tokens.scss";
// @ts-expect-error Next.js bundles global SCSS imports without TypeScript declarations.
import "./globals.scss";
import styles from "./main.module.scss";

const SITE_URL = "https://massdev.dev";
const SITE_NAME = "Massimiliano Marcello";
const SITE_DESCRIPTION =
  "Frontend engineer focused on architecture and design systems, based in Brussels. Case studies, code and writing.";

// Il layout è un server component (prima era "use client", il che impediva
// di esportare metadata). I componenti interattivi dichiarano "use client" da soli.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Frontend engineer, design systems`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Frontend engineer, design systems`,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Frontend engineer, design systems`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={zf.variable}>
      <body className={`${zf.className} ${styles.pageRoot}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
