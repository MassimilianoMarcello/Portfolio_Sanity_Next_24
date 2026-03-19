"use client";
 
import NavbarPages from '@/components/_NavBar/NavbarPages';
import BackToTopButton from './projects/[slug]/BackTopButton';
 
export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ overflowX: 'clip', width: '100%' }}>
      <NavbarPages />
      {children}
      {/* FAB mobile — figlio diretto del main, nessun contesto di stacking */}
      <BackToTopButton className="backToTopFab" />
    </main>
  );
}




