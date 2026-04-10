import styles from "./About.module.scss";

const About = () => {
  return (
    <section className={styles.container}>

      {/* Bordered pill kicker — same as Case studies and Contact */}
      <div className={styles.sectionKicker}>
        <span>Intro</span>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.hero}>
          <img src="/massi.png" alt="Massimiliano Marcello" className={styles.avatar} />

          <h1 className={styles.headline}>
            Full-stack developer<br />
            <span className={styles.headlineMuted}>focused on frontend architecture and design systems.</span>
          </h1>
          <p className={styles.byline}>Massimiliano Marcello · Brussels</p>
        </div>

        <div className={styles.body}>
          <p>
          Currently building BeSpoken — a component system for Phoenix LiveView based on Atomic Design principles, with Tailwind and DaisyUI.
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
      </div>

    </section>
  );
};

export default About;
