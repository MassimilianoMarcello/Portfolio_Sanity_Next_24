import React from "react";
import styles from "./Contact.module.scss";
import Link from "next/link";

const Contact = () => {
  return (
    <section className={styles.contactContainer} id="contact">
      <div className={styles.sectionKicker}>Contact</div>

      <div className={styles.contactGrid}>
        {/* Get in touch */}
        <div className={styles.contactBlock}>
          <span className={styles.blockKicker}>02 — Get in touch</span>
          <h2 className={styles.blockTitle}>Let's talk</h2>
          <p className={styles.blockDesc}>
            Interested in a project, collaboration, or potential opportunity?
            Feel free to reach out.
          </p>

          <div className={styles.linkList}>
            <Link href="mailto:massdevone@gmail.com" className={styles.contactLink}>
              <span className={styles.linkLabel}>Email</span>
              <span className={styles.linkValue}>massdevone@gmail.com</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/massimiliano-marcello-4195681a7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <span className={styles.linkLabel}>LinkedIn</span>
              <span className={styles.linkValue}>massimiliano-marcello</span>
            </Link>
          </div>

          <Link href="mailto:massdevone@gmail.com" className={styles.actionBtn}>
            Send a message ↗
          </Link>
        </div>

        {/* Follow me */}
        <div className={styles.contactBlock}>
          <span className={styles.blockKicker}>03 — Follow me</span>
          <h2 className={styles.blockTitle}>Stay updated</h2>
          <p className={styles.blockDesc}>
            Latest projects, thoughts, and insights.
          </p>

          <div className={styles.linkList}>
            <Link
              href="https://x.com/MassDev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <span className={styles.linkLabel}>Twitter</span>
              <span className={styles.linkValue}>@massdev</span>
            </Link>
            <Link
              href="https://github.com/massimilianomarcello"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <span className={styles.linkLabel}>GitHub</span>
              <span className={styles.linkValue}>massimilianomarcello</span>
            </Link>
          </div>

          <Link
            href="https://x.com/MassDev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionBtn}
          >
            Follow on Twitter ↗
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
