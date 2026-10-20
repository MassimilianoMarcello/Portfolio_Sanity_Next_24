
import styles from "./About.module.scss";

const About = () => {
  return (
    <section className={styles.container}>
      <div className={styles.sectionKicker}>
        <span>Intro</span>
      </div>

      <h1 className={styles.headline}>
        Frontend Engineer<br />
        <span className={styles.headlineMuted}>
          exploring component design and usability.
        </span>
      </h1>

      <div className={styles.contentGrid}>
        <p className={styles.byline}>
          Massimiliano Marcello · Brussels
        </p>

        <div className={styles.body}>
          <p>
            I&apos;m currently contributing to beSpoken, where I&apos;m exploring
            component design with Phoenix LiveView, Tailwind CSS and DaisyUI.
          </p>

          <p>
            It&apos;s early days. I&apos;ve built a couple of basic components and
            encountered problems I hadn&apos;t anticipated. It&apos;s made me realise
            how many decisions sit behind something that looks simple on screen.
          </p>

          <p className={styles.current}>
            I&apos;m interested in how people interact with interfaces, and in
            designing components that help them understand what to do,
            navigate with confidence and accomplish what they came for.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

