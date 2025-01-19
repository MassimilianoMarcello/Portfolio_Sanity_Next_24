"use client";

import Footer from "@/components/ΩFooter/Footer";
import { zf } from "../styles/fonts";
// import "./page.module.scss";
import "./main.module.scss";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="accatiemmelle">
      <body className={zf.className}>
  
        {children}
        <Footer />
      </body>
    </html>
  );
}
