import React from "react";
import styles from "./Contact.module.scss";
import Link from "next/link";

const Contact = () => {
  return (
    <section className={styles.contactContainer} id="contact">

      {/* Bordered pill kicker — same style as "Case studies" */}
      <div className={styles.sectionKicker}>
        <span>Contact</span>
      </div>

      <div className={styles.contactGrid}>

        {/* Left spacer — aligns content with project cards */}
        <div className={styles.contactSpacer} />

        {/* Right content — two blocks */}
        <div className={styles.contactBlocks}>

          {/* Get in touch */}
          <div className={styles.contactBlock}>
            <span className={styles.blockKicker}>Get in touch</span>
            <h2 className={styles.blockTitle}>Let's talk</h2>
            <p className={styles.blockDesc}>
              Open to projects, collaborations, and opportunities.
              I read every message.
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

          {/* Code */}
          <div className={styles.contactBlock}>
            <span className={styles.blockKicker}>Code</span>
            <h2 className={styles.blockTitle}>See the work</h2>
            <p className={styles.blockDesc}>
              All projects, contributions, and experiments live on GitHub.
            </p>

            <div className={styles.linkList}>
              <Link
                href="https://github.com/massimilianomarcello"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.linkLabel}>GitHub</span>
                <span className={styles.linkValue}>massimilianomarcello</span>
              </Link>
              <Link
                href="https://x.com/MassDev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.linkLabel}>Twitter</span>
                <span className={styles.linkValue}>@massdev</span>
              </Link>
            </div>

            <Link
              href="https://github.com/massimilianomarcello"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
            >
              View GitHub profile ↗
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
