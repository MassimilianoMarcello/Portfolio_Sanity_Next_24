import styles from "./About.module.scss";

const About = () => {
  return (
    <section className={styles.container}>
      <span className={styles.kicker}>01 — Intro</span>

      <div className={styles.hero}>
        <h1 className={styles.headline}>
          Full-stack developer<br />
          <span className={styles.headlineMuted}>building production systems.</span>
        </h1>
        <p className={styles.byline}>Massimiliano Marcello · Brussels</p>
      </div>

      <div className={styles.body}>
        <p>
          Currently the only developer at a pre-seed startup — building on
          Google Cloud Platform with Kubernetes and Terraform.
        </p>
        <p>
          My path wasn't linear: communications, radio journalism, restaurant
          kitchens, social work. What connects all of it is learning complex
          systems quickly and making them work for real people. Same approach
          to code — structure, clarity, attention to who uses the product.
        </p>
        <p className={styles.current}>
          Expanding into Elixir and Phoenix. Long-term focus on distributed
          systems and real-time applications.
        </p>
      </div>
    </section>
  );
};

export default About;
