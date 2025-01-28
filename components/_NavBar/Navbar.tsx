import React, { useState } from "react";
import Link from "next/link";
import styles from "../../app/main.module.scss";
import TriangleIcon from "../ΩΩElements/TriangleIcon";
import Space from "./Space";
import EnvelopeIcon from "../ΩΩElements/EnvelopeIcon";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  const handleMouseEnterContact = () => {
    setIsContactHovered(true);
  };

  const handleMouseLeaveContact = () => {
    setIsContactHovered(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img src="/logo-grey.webP" alt="Logo" />
          </Link>

          {/* Links */}
          <div className={styles.navbarLinks}>
            {/* Projects dropdown */}
            <div
              className={styles.navLink}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              Projects
              <span className={styles.triangleContainer}>
                <TriangleIcon />
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
                  Main Projects
                </a>
                <a
                  href="#secondary"
                  onClick={(e) => handleLinkClick(e, "secondary")}
                  className={styles.dropdownItem}
                >
                  Secondary Projects
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

            {/* Contacts link */}
            <div
              className={styles.contactContainer}
              onMouseEnter={handleMouseEnterContact}
              onMouseLeave={handleMouseLeaveContact}
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
      <Space />
    </div>
  );
};

export default Navbar;