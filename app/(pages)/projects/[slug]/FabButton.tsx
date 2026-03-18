"use client";

import { useEffect, useState } from "react";

// app/(pages)/projects/[slug]/FabButton.tsx
export default function FabButton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!isMobile) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '0.4rem',
        position:       'fixed',
        bottom:         '1.5rem',
        right:          '1rem',
        fontFamily:     "'IBM Plex Mono', monospace",
        fontSize:       '0.58rem',
        textTransform:  'uppercase',
        letterSpacing:  '0.1em',
        color:          '#2e2c38',
        background:     '#fafaf8',
        border:         '1px solid rgba(145,117,186,0.3)',
        borderRadius:   '20px',
        padding:        '0.55rem 1rem',
        cursor:         'pointer',
        boxShadow:      '0 4px 16px rgba(62,35,115,0.12)',
        zIndex:         100,
      }}
    >
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
}