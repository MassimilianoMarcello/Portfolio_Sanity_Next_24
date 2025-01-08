import { Project } from "@/types/projects";
import Link from "next/link";
import style from "./ProjectInfo.module.scss";
import styles from "./ProjectList.module.scss";
import Image from "next/image";

interface ProjectInfosProps {
  project: Project;
  openProjectId: string | null;
}

const ProjectInfos: React.FC<ProjectInfosProps> = ({ project, openProjectId }) => {
  return (
    <div
      className={`${styles.projectInfo} ${
        project._id === openProjectId ? styles.visible : styles.hidden
      }`}
    >
      {/* <h3>{project.name}</h3> */}

      {project.challenges && project.challenges.length > 0 ? (
        <ul className={styles.challengesList}>
          {/* <h4 className={styles.titleBubble}>Challenges Faced:</h4> */}
          <div className={styles.styledButton}>
          <h3>{project.name.toUpperCase()}</h3>
            <Link href={`/projects/${project.slug}`}> GO to See How i made it
                  <Image src="/forward.svg" alt="external link" width={20} height={20} />
            </Link>
          </div>
          <p>Challanges Faced List:</p>
          {project.challenges.map((challenge) => {
            // Genera lo stesso ID basato sul titolo della challenge
            // Converte il titolo di una challenge in una stringa "slug-friendly", 
            // sostituendo gli spazi con trattini (-) e rendendola tutta in minuscolo
            const challengeId = `challenge-${challenge.title.replace(/\s+/g, '-').toLowerCase()}`;

            return (
              <li key={challenge._id}>
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
                    <Link href={project.githubUrl}>GitHub</Link>
                    <Image src="/github.svg" alt="external link" width={28} height={28} />
                  </div>
                  <div className={styles.styledButtonWebsite}>
                    <Link href={project.url}>Visit Website
                    <Image src="/forward.svg" alt="external link" width={20} height={20} />
                    </Link>
              
                </div>
   
        </div>
      </div>
  
  );
};

export default ProjectInfos;





