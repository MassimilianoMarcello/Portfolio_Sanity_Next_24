import React, { useState } from "react";
import Link from "next/link";
import styles from "../../app/main.module.scss";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Funzione per aprire il dropdown
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  // Funzione per chiudere il dropdown
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar}  onMouseLeave={handleMouseLeave} >
      <div className={styles["navbar-content"]}>
        {/* Logo */}
        <Link href="/" className={styles.logo} >
          <img src="/logo-massdev.webp" alt="Logo" />
        </Link>

        {/* Links */}
        <div className={styles["navbar-links"]}>
          {/* Projects dropdown */}
          <div
            className={styles["nav-link"]} 
            onMouseEnter={handleMouseEnter} // Apre il dropdown quando il mouse entra
        
          >
                      Projects
            <div
              className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ''}`}
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
          <Link href="/contacts" className={styles["nav-link"]}>
            Contacts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
