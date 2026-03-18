"use client";

import React from "react";
import styles from "./singleProject.module.scss";

const BackToTopButton: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={styles.backToTopBtn} onClick={handleScrollToTop}>
      Top ↑
    </button>
  );
};

export default BackToTopButton;