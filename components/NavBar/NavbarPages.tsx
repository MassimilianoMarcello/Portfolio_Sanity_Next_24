"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../app/main.module.scss";

const NavbarPages: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.navbarContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img src="/logo-grey.webp" alt="Logo" />
          </Link>

          {/* Back to projects */}
          <div className={styles.navbarLinks}>
            <Link href="/" className={styles.linkProjectsReturn}>
              Case Studies
            </Link>
          </div>
        </div>
      </nav>

      <div className={styles.navSpacer} />
    </>
  );
};

export default NavbarPages;
