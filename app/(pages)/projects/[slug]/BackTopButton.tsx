"use client";

import React from "react";
import styles from "./singleProject.module.scss";
import TriangleIcon from "@/components/ΩΩElements/TriangleIcon";
import TriangleIconInverted from "@/components/ΩΩElements/TriangleIconInverted";

const BackToTopButton: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (<>
   <a className={styles.backToTopButton} onClick={handleScrollToTop}>
     <span>top</span> 
     <span className={styles.iconTriangle}>
      <TriangleIconInverted />
      </span>
    </a>

  
  </>
   
  );
};

export default BackToTopButton;
