"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../app/main.module.scss";
import TriangleIcon from "../ui/TriangleIcon";
import EnvelopeIcon from "../ui/EnvelopeIcon";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scrolled class for frosted glass intensity
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
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.navbarContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img src="/logo-grey.webP" alt="Logo" />
          </Link>

          {/* Links */}
          <div className={styles.navbarLinks}>
            {/* Projects dropdown */}
            <div
              className={styles.navItem}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <span className={styles.navLink}>
                Projects
                <span className={styles.triangleContainer}>
                  <TriangleIcon />
                </span>
              </span>

              <div
                className={`${styles.dropdownMenu} ${
                  isDropdownOpen ? styles.show : ""
                }`}
              >
                <a
                  href="#main"
                  onClick={(e) => handleLinkClick(e, "main")}
                  className={styles.dropdownItem}
                >
                  Core
                </a>
                <a
                  href="#secondary"
                  onClick={(e) => handleLinkClick(e, "secondary")}
                  className={styles.dropdownItem}
                >
                  Secondary
                </a>
                <a
                  href="#sandbox"
                  onClick={(e) => handleLinkClick(e, "sandbox")}
                  className={styles.dropdownItem}
                >
                  Sandbox
                </a>
              </div>
            </div>

            {/* Contact */}
            <div
              className={styles.contactContainer}
              onMouseEnter={() => setIsContactHovered(true)}
              onMouseLeave={() => setIsContactHovered(false)}
            >
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                className={styles.navLink}
              >
                Contact
              </a>
              <span
                className={`${styles.envelopeContainer} ${
                  isContactHovered ? styles.moveRight : ""
                }`}
              >
                <EnvelopeIcon />
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer replaces Space.tsx */}
      <div className={styles.navSpacer} />
    </>
  );
};

export default Navbar;