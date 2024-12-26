// Navbar.tsx
import React, { useState } from "react";
import Link from "next/link";
import styles from "../../app/main.module.scss";
import TriangleIcon from "../ΩΩElements/TriangleIcon";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar} onMouseLeave={handleMouseLeave}>
      <div className={styles.navbarContent}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img src="/logo-massdev.webp" alt="Logo" />
        </Link>

        {/* Links */}
        <div className={styles.navbarLinks}>
          {/* Projects dropdown */}
          <div
            className={styles.navLink}
            onMouseEnter={handleMouseEnter}
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
              <a href="#main" className={styles.dropdownItem}>
                Main Projects
              </a>
              <a href="#secondary" className={styles.dropdownItem}>
                Secondary Projects
              </a>
              <a href="#testing" className={styles.dropdownItem}>
                Testing Projects
              </a>
            </div>
          </div>

          {/* Contacts link */}
          <Link href="#contact" className={styles.navLink}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

