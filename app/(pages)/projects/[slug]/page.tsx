import { getProject } from "@/sanity/sanity.query";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import styles from "./singleProject.module.scss";
import ChallengeLink from "./ChallangeLink";
import BackToTopButton from "./BackTopButton"; // Importa il Client Component
import { portableTextComponents } from "./portableTextComponents";
import RepoAndWebSiteButtons from "@/components/ΩΩElements/RepoAndWebSiteButtons";
import TriangleIcon from "@/components/ΩΩElements/TriangleIcon";
import TriangleIconLeftDoubled from "@/components/ΩΩElements/TriangleIconLeftDoubled";
import SquareElement from "@/components/ΩΩElements/squareElement";
import SquareDecoration from '@/components/ΩΩElements/squareDecoration';
import challenge from "@/schemas/challenge";
type Props = {
  params: { slug: string };
};

export default async function Project({ params }: Props) {
  const project = await getProject(params.slug);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div id="top" className={styles.projectContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleContainer}>
          <h1 className={styles.howIMade}>How Designed:</h1>
          <h1 className={styles.titleProject}>{project.name}</h1>

          <RepoAndWebSiteButtons
            githubUrl={project.githubUrl}
            url={project.url}
          />
        </div>
        <div className={styles.projectDescription}>
      
      <SquareDecoration
        squares={[
          { top: '-2rem', left: '-3.5rem', size: '15px' },
          { bottom: '-2rem', right: '-3.5rem', size: '25px' },
          { bottom: '-21.93rem', left: '-3.5rem', size: '20px' },
          { bottom: '-21.93rem', right: '-3.5rem', size: '20px' },
          

        ]}
      />

          <div className={styles.projectDescriptionBorderTop}></div>
          {project.content ? (
            <PortableText
              value={project.content}
              components={portableTextComponents}
            />
          ) : (
            <p>No content available for this project.</p>
          )}
        </div>
      </div>

      {project.challenges && project.challenges.length > 0 ? (
        <div className={styles.challengesSection}>
      
          <ul className={styles.challengesList}>
<div className={styles.titleProjectOnIndexContainer}>
<h5 className={styles.titleProjectOnIndex}>{project.name}</h5>
</div>
        
            <div className={styles.challengesIndexContainer }>
          
              <span className={styles.squareIndex}></span>
              <h4 className={styles.challengesIndexTitle}>Challenges Index:</h4>
            </div>

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

            <div className={styles.buttonsIndex}>
              <Link href={`/`} className={styles.backToProject}>
              <span className={styles.iconTriangle}>
              <TriangleIconLeftDoubled />
              </span>
               
                <span>Back</span>
              </Link>

              <BackToTopButton />
            </div>
          </ul>

          <div className={styles.challengeDetails}>
            {project.challenges.map((challenge) => {
              const challengeId = `challenge-${challenge.title
                .replace(/\s+/g, "-")
                .toLowerCase()}`;
              return (
                <div
                  id={challengeId}
                  key={challenge._id}
                  className={styles.challengeItem}
                >
                  {/* same classes than index */}
                  <div className={`${styles.challengesIndexContainer} ${styles.withborder}`}>
                    <h5 className={styles.challengesIndexTitle}>
                      {challenge.title}
                    </h5>
                    <div className={styles.squareIndex}></div>
                  </div>
                  <h5>Challange</h5>
                  {challenge.description && (
                    <p className={styles.challangeDescription}>
                      {challenge.description}
                    </p>
                  )}
                  <h5>Solution</h5>
                  {challenge.solution && (
                    <p className={styles.challangeDescription}>
                      {challenge.solution}
                    </p>
                  )}

                  {challenge.content && (
                    <PortableText
                      value={challenge.content}
                      components={portableTextComponents}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No challenges faced for this project.</p>
      )}
    </div>
  );
}
