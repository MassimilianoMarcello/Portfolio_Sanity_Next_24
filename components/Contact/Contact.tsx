import React from "react";
import styles from "./Contact.module.scss";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <div className={styles.contactContainer} id="contact">
        <h1>Contact</h1>
        <div className={styles.contactContent}>
          <h2 className={styles.titleContact}>Get in touch</h2>
          <p className={styles.titleDescription}>
            If you'd like to discuss a project, collaboration, or speaking
            opportunity, feel free to reach out.
          </p>
          <div>
            <Link href="mailto:massdev@gmail.com">
              <p className={styles.mailLink}>Email: massdev@gmail.com</p>
            </Link>
            <a
              href="https://www.linkedin.com/in/massimiliano-marcello-4195681a7/"
              target="_blank"
            >
              <p  className={styles.Linkdin}>
                LinkedIn:
                https://www.linkedin.com/in/massimiliano-marcello-4195681a7/
              </p>
            </a>
            <a href="mailto:massdev@gmail.com" target="_blank">
            
              <button className={styles.messageButton}>
                Send a Message</button>
            </a>
          </div>
          <div>
            <h2 className={styles.titleContact}>Follow Me</h2>
            <p className={styles.titleDescription}>
              Stay updated with my latest projects, thoughts, and insights.
            </p>
            <a href="https://x.com/MassDev" target="_blank">
              <p className={styles.twitter}>Twitter: @massdev</p>
            </a>
            <a href="https://github.com/massimilianomarcello" target="_blank">
              <p className={styles.github}>GitHub: github.com/massimilianomarcello</p>
            </a>
            <a href="https://x.com/MassDev" target="_blank">
              <button className={styles.followButton}>Follow on Twitter</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
