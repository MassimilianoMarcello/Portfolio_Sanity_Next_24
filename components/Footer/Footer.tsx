import "./Footer.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} Massimiliano Marcello
        </span>
        <nav className="footer-links">
          <Link href="mailto:massdevone@gmail.com">Email</Link>
          <Link href="https://github.com/massimilianomarcello" target="_blank" rel="noopener noreferrer">GitHub</Link>
          <Link href="https://www.linkedin.com/in/massimiliano-marcello-4195681a7" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
          <Link href="https://x.com/MassDev" target="_blank" rel="noopener noreferrer">Twitter</Link>
        </nav>
        <span className="footer-location">Brussels — {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;

