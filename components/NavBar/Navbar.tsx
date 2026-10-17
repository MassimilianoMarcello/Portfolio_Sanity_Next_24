"use client";

import React, { useState, useEffect, useId } from "react";
import Link from "next/link";
import styles from "../../app/main.module.scss";

const SECTIONS = [
  { id: "main",      label: "Primary projects" },
  { id: "secondary", label: "Secondary projects" },
  { id: "sandbox",   label: "Sandbox" },
] as const;

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gli scroll alle sezioni sono ancore native: `scroll-behavior: smooth` è in
  // globals.scss e `scroll-margin-top` sulle sezioni compensa la navbar fissa.
  // Prima si usava `offsetTop`, che ignorava l'altezza della navbar.
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <>
      <nav
        aria-label="Main"
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        onMouseLeave={closeDropdown}
      >
        <div className={styles.navbarContent}>
          {/* Logo */}
          <Link
            href="/"
            className={styles.logo}
            onMouseEnter={closeDropdown}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image non lo ottimizza */}
            <img src="/logo_massdev.svg" alt="Massimiliano Marcello — home" />
          </Link>

          {/* Desktop links */}
          <div className={`${styles.navbarLinks} ${styles.navDesktop}`}>
            {/* Case studies dropdown: si apre con hover, focus da tastiera e si chiude con Esc */}
            <div
              className={styles.navItem}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  closeDropdown();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeDropdown();
              }}
            >
              <button
                type="button"
                className={styles.navLink}
                aria-expanded={isDropdownOpen}
                aria-controls={menuId}
              >
                Case Studies
              </button>

              <div
                id={menuId}
                className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ""}`}
              >
                {SECTIONS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={closeDropdown}
                    className={styles.dropdownItem}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Blog */}
            <div className={styles.navItem} onMouseEnter={closeDropdown}>
              <Link href="/blog_post" className={styles.navLink}>
                Blog
              </Link>
            </div>

            {/* Contact */}
            <div
              className={styles.contactContainer}
              onMouseEnter={closeDropdown}
            >
              <a href="#contact" className={styles.navLink}>
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Mobile links — sotto il contenuto principale */}
        <div className={styles.navMobile}>
          <a href="#main" className={styles.navLink}>
            Case Studies
          </a>
          <Link href="/blog_post" className={styles.navLink}>
            Blog
          </Link>
          <a href="#contact" className={styles.navLink}>
            Contact
          </a>
        </div>
      </nav>

      <div className={styles.navSpacer} />
    </>
  );
};

export default Navbar;
