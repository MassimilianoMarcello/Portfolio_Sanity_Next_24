import { Project } from "@/types/projects";
import Link from "next/link";

import styles from "./ProjectList.module.scss";
import Image from "next/image";

interface ProjectInfosProps {
  project: Project;
  openProjectId: string | null;
}

const ProjectInfos: React.FC<ProjectInfosProps> = ({
  project,
  openProjectId,
}) => {
  return (
    <div
      className={`${styles.projectInfo} ${
        project._id === openProjectId ? styles.visible : styles.hidden
      }`}
    >
      {project.challenges && project.challenges.length > 0 ? (
        <ul className={styles.challengesList}>
       
       
          <div className={styles.blogLinkContainer}>
          <Link href={`/projects/${project.slug}` } target="_blank" rel="noopener noreferrer" className={styles.blogLinkPrimary}>
           
           <p className={styles.bubbleTitle}>   See How I Designed It</p>
              <Image
                src="/forward.svg"
                alt="external link"
                width={15}
                height={15}
              />
      
            </Link>
            <p className={styles.projectStatus}>status: {project.status}</p>
          </div>
     
        

          <h4 className={styles.challangesFaced}>Challenges Faced:</h4>
          {project.challenges.map((challenge) => {
            const challengeId = `challenge-${challenge.title
              .replace(/\s+/g, "-")
              .toLowerCase()}`;
            return (
              <li key={challenge._id} className={styles.challengesListItem}>
                <Link href={`/projects/${project.slug}#${challengeId}`}>
                  {challenge.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No challenges faced for this project.</p>
      )}

      <div className={styles.visitRepoAndWebsiteButtons}>
        <div className={styles.styledButtonGit}>
          <Link href={project.githubUrl} aria-label="Go to GitHub repository" target="_blank" rel="noopener noreferrer">
            GitHub
            <Image
            src="/github.svg"
            alt="external link"
            width={28}
            height={28}
            aria-hidden="true"
          />
          </Link>

        </div>
        <div className={styles.styledButtonWebsite}>
          <Link href={project.url} aria-label="Visit project website" target="_blank" rel="noopener noreferrer">
            Visit Website
            <Image
              src="/forward.svg"
              alt="external link"
              width={20}
              height={20}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfos;
