import React, { useState } from "react";
import Link from "next/link";
import styles from "../../app/main.module.scss";
import TriangleIcon from "../ΩΩElements/TriangleIcon";
import Space from "./Space";
import EnvelopeIcon from "../ΩΩElements/EnvelopeIcon";

const Navbar: React.FC = () => {
  const [isContactHovered, setIsContactHovered] = useState(false);

  const handleContactMouseEnter = () => {
    setIsContactHovered(true);
  };

  const handleContactMouseLeave = () => {
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
            <img src="/logo-massdev.webp" alt="Logo" />
          </Link>

          {/* Links */}
          <div className={styles.navbarLinks}>
            {/* Projects dropdown */}
            <div className={styles.navLink}>
              Projects
              <span className={styles.triangleContainer}>
                <TriangleIcon />
              </span>
            </div>

            {/* Contacts link */}
            <div
              className={styles.contactContainer}
              onMouseEnter={handleContactMouseEnter}
              onMouseLeave={handleContactMouseLeave}
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


