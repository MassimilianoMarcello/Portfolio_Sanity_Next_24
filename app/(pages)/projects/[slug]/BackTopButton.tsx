"use client";

import React from "react";

interface BackToTopButtonProps {
  className?: string;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ className }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={className} onClick={handleScrollToTop} aria-label="Back to top">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M5 8V2M2 5l3-3 3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Top
    </button>
  );
};

export default BackToTopButton;