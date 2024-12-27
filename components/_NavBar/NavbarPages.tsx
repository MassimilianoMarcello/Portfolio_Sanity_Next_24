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
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img src="/logo-massdev.webp" alt="Logo" />
        </Link>

        {/* Links */}
        {/* <div className={styles.navbarLinks}>
          {/* Projects dropdown */}
          {/* <div
            className={styles.navLink}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
                href="#testing"
                onClick={(e) => handleLinkClick(e, "testing")}
                className={styles.dropdownItem}
              >
                Testing Projects
              </a>
            </div>
          </div>

    
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className={styles.navLink}
          >
            Contact
          </a>
        </div>  */}
      </div>
    </nav>
  );
};

export default Navbar;
