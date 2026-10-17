import NavbarPages from '@/components/NavBar/NavbarPages';
import BackToTopButton from './projects/[slug]/BackTopButton';

// Server component: i client component (NavbarPages, BackToTopButton) si
// dichiarano da soli. Il <main> sta nelle singole pagine, quindi qui basta un
// div: prima c'erano due <main> annidati.
export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ overflowX: 'clip', width: '100%' }}>
      <NavbarPages />
      {children}
      {/* FAB mobile — figlio diretto del wrapper, nessun contesto di stacking */}
      <BackToTopButton className="backToTopFab" />
    </div>
  );
}




