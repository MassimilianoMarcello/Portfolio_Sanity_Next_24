import React from "react";
import styles from "./Contact.module.scss";
import Link from "next/link";
import SquareElement from "../ΩΩElements/squareElement"; // Adjust the path as necessary

const Contact = () => {
  return (
    <>
  
      <div className={styles.contactContainer} id="contact">
      <div className={styles.mainBox}> 
        <div className={styles.squareTitleContainer}>
                <SquareElement
  title="Contact"
  positions={[
    { top: "35%", left: "6%" },
   
  ]}
  colors={["#a4a9cf"]}
/>
        </div>

</div>
        <div className={styles.contactContent}>
        <div className={styles.getInTouchContainer} >
          <h2 className={styles.titleContact}>Get in touch</h2>
          <p className={styles.titleDescription}>
          If you're interested in discussing a project, collaboration, or potential employment opportunity, feel free to reach out.
</p>
          <div>
            <Link href="mailto:massdev@gmail.com" className={styles.link}>
              <span className={styles.label}> Email: </span>    <span className={styles.labelContent}>massdevone@gmail.com</span> 
            </Link>
            <Link
              href="https://www.linkedin.com/in/massimiliano-marcello-4195681a7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span className={styles.label}> LinkedIn:</span>{" "}
           <span className={styles.labelContent}>   https://www.linkedin.com/in/massimiliano-marcello-4195681a7/</span>
            </Link>
            <Link
              href="mailto:massdev@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
         
            </Link >
            <button className={styles.followButton}>     <Link 
              href="mailto:massdev@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.styleLink}
            >

            
              Send a Message
            </Link>
            </button>
            </div>
          </div>
          <div className={styles.followMeContainer} >
            <h2 className={styles.titleContact}>Follow Me</h2>
            <p className={styles.titleDescription}>
              Stay updated with my latest projects, thoughts, and insights.
            </p>
            <Link
              href="https://x.com/MassDev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span className={styles.label}> Twitter:</span>    <span className={styles.labelContent}> @massdev</span>
            </Link>
            <Link
              href="https://github.com/massimilianomarcello"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span className={styles.label}> GitHub:</span>    <span className={styles.labelContent}> github.com/massimilianomarcello</span>
            </Link>
            <a
              href="https://x.com/MassDev"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <button className={styles.followButton}>Follow on Twitter</button>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Contact;
