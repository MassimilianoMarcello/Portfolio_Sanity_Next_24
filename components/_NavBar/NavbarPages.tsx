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
          <div className={styles.navbarLinks}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <img src="/logo-grey.webp" alt="Logo" />
            </Link>

            <div
              className={styles.navLink}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link href="/" className={styles.linkProjectsReturn}>
                {" "}
                Projects
              </Link>

              <span className={styles.triangleContainer}>
                <TriangleIcon />
              </span>
            </div>
          </div>{" "}
        </div>
      </nav>
      <Space />
    </div>
  );
};

export default Navbar;
