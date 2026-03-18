import React from "react";

export const EnvelopeIcon: React.FC = () => (
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M1,4 L15,4 L15,16 L1,16 Z" fill="none" stroke="currentColor" strokeWidth="1" />
    <path d="M1,4 L8,10 L15,4" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const TriangleIcon: React.FC = () => (
  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
    <polygon points="8,14 3,3 12,3" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const TriangleIconInverted: React.FC = () => (
  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
    <polygon points="8,0 3,11 12,11" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const TriangleIconLeftDoubled: React.FC = () => (
  <svg width="28" height="14" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,8 11,3 11,12" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);