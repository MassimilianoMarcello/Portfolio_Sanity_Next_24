"use client";
 
import Footer from "@/components/Footer/Footer";  // renamed from ΩFooter
import { zf } from "../styles/fonts";
import "./globals.scss";
import styles from "./main.module.scss";
 
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

