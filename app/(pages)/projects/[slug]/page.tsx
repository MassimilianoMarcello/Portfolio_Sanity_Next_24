import { getProject } from "@/sanity/sanity.query";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import styles from "./singleProject.module.scss";
import ChallengeLink from "./ChallangeLink";
import BackToTopButton from "./BackTopButton";
import { portableTextComponents } from "./portableTextComponents";
import RepoAndWebSiteButtons from "@/components/ui/RepoAndWebSiteButtons";
import FabButton from "./FabButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return <div className={styles.notFound}>Project not found.</div>;
  }

  return (
    <div id="top" className={styles.projectContainer}>

      {project.challenges && project.challenges.length > 0 && (
        <aside className={styles.sidebar}>
          <span className={styles.sidebarKicker}>Case study</span>
          <p className={styles.sidebarTitle}>{project.name}</p>

          <nav className={styles.challengeNav}>
            <span className={styles.navLabel}>Challenges</span>
            <ul className={styles.challengesList}>
              {project.challenges.map((challenge) => {
                const challengeId = `challenge-${challenge.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`;
                return (
                  <ChallengeLink
                    key={challenge._id}
                    challengeId={challengeId}
                    title={challenge.title}
                  />
                );
              })}
            </ul>
          </nav>

          <div className={styles.sidebarActions}>
            <Link href="/" className={styles.backLink}>
              ← Back
            </Link>
            <BackToTopButton className={styles.backToTopBtn} />
          </div>
        </aside>
      )}

      <main className={styles.mainContent}>

        <header className={styles.projectHeader}>
          <span className={styles.headerKicker}>Case study</span>
          <h1 className={styles.projectTitle}>{project.name}</h1>
          <RepoAndWebSiteButtons
            githubUrl={project.githubUrl}
            url={project.url}
          />
        </header>

        <section className={styles.projectDescription}>
          {project.content ? (
            <PortableText value={project.content} components={portableTextComponents} />
          ) : (
            <p>No content available for this project.</p>
          )}
        </section>

        {project.challenges && project.challenges.length > 0 && (
          <section className={styles.challengeDetails}>
            <span className={styles.sectionKicker}>Challenges &amp; solutions</span>

            {project.challenges.map((challenge, i) => {
              const challengeId = `challenge-${challenge.title
                .replace(/\s+/g, "-")
                .toLowerCase()}`;
              return (
                <div id={challengeId} key={challenge._id} className={styles.challengeItem}>
                  <div className={styles.challengeHeader}>
                    <span className={styles.challengeNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className={styles.challengeTitle}>{challenge.title}</h2>
                  </div>

                  {challenge.description && (
                    <div className={styles.challengeBlock}>
                      <span className={styles.blockLabel}>Challenge</span>
                      <p className={styles.blockText}>{challenge.description}</p>
                    </div>
                  )}

                  {challenge.solution && (
                    <div className={styles.challengeBlock}>
                      <span className={styles.blockLabel}>Solution</span>
                      <p className={styles.blockText}>{challenge.solution}</p>
                    </div>
                  )}

                  {challenge.content && (
                    <PortableText value={challenge.content} components={portableTextComponents} />
                  )}
                </div>
              );
            })}
          </section>
        )}
      </main>

      <FabButton />

    </div>
  );
}
