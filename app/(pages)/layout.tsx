"use client";

import NavbarPages from '@/components/_NavBar/NavbarPages'; // Adjust the path as necessary






export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>
    <NavbarPages />
    {children}</main>; // Questo layout non include la navbar
}




