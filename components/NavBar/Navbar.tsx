"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../app/main.module.scss";
import { TriangleIcon, EnvelopeIcon } from "../ui/Icons";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
    }
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        onMouseLeave={() => {
          setIsDropdownOpen(false);
          setIsContactHovered(false);
        }}
      >
        <div className={styles.navbarContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img src="/logo_only.svg" alt="Logo" />
          </Link>
          <Link href="/" className={styles.logotext}>
            <img src="/massdev-textlogo.svg" alt="Logo" />
          </Link>

          {/* Desktop links */}
          <div className={`${styles.navbarLinks} ${styles.navDesktop}`}>
            {/* Projects dropdown */}
            <div
              className={styles.navItem}
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <span className={styles.navLink}>
                Case Studies
                {/* <span className={styles.triangleContainer}>
                  <TriangleIcon />
                </span> */}
              </span>

              <div
                className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ""}`}
              >
                <a
                  href="#main"
                  onClick={(e) => handleLinkClick(e, "main")}
                  className={styles.dropdownItem}
                >
                  main
                </a>
                <a
                  href="#secondary"
                  onClick={(e) => handleLinkClick(e, "secondary")}
                  className={styles.dropdownItem}
                >
                  secondary
                </a>
                <a
                  href="#sandbox"
                  onClick={(e) => handleLinkClick(e, "sandbox")}
                  className={styles.dropdownItem}
                >
                  sandbox
                </a>
              </div>
            </div>

            {/* Blog */}
            <div className={styles.navItem}>
              <Link href="/blog_post" className={styles.navLink}>
                Blog
              </Link>
            </div>

            {/* Contact */}
            <div
              className={styles.contactContainer}
              onMouseEnter={() => setIsContactHovered(true)}
            >
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                className={styles.navLink}
              >
                Contact
              </a>
              {/* <span className={`${styles.envelopeContainer} ${isContactHovered ? styles.moveRight : ""}`}>
                <EnvelopeIcon />
              </span> */}
            </div>
          </div>
        </div>

        {/* Mobile links — sotto il contenuto principale */}
        <div className={styles.navMobile}>
          <Link href="/" className={styles.navLink}>
            Case Studies
          </Link>
          <Link href="/blog_post" className={styles.navLink}>
            Blog
          </Link>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className={styles.navLink}
          >
            Contact
          </a>
        </div>
      </nav>

      <div className={styles.navSpacer} />
    </>
  );
};

export default Navbar;
