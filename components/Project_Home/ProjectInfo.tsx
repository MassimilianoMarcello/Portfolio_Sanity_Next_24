import { Project } from "@/types/projects";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ProjectList.module.scss";
import Image from "next/image";
import RepoAndWebSiteButtons from "../ΩΩElements/RepoAndWebSiteButtons";

interface ProjectInfosProps {
  project: Project;
  openProjectId: string | null;
}

const ProjectInfos: React.FC<ProjectInfosProps> = ({
  project,
  openProjectId,
}) => {
  const router = useRouter();

// Funzione per gestire la navigazione e lo scroll
const handleScrollToChallenge = (challengeId: string) => {
  // Prima naviga alla pagina del progetto
  router.push(`/projects/${project.slug}`);
  setTimeout(() => {
    // Dopo un breve ritardo, scorri fino alla sezione specifica
    setTimeout(() => {
      const element = document.getElementById(challengeId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth", // Animazione di scroll
          block: "start",     // Posiziona l'elemento in cima
        });
      }
  }, 500);
    }, 300);
  };
  

  const generateChallengeId = (title: string) => `challenge-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={`${styles.projectInfo} ${
        project._id === openProjectId ? styles.visible : styles.hidden
      }`}
    >
      {project.challenges?.length ? (
        <ul className={styles.challengesList}>
          <div className={styles.blogLinkContainer}>
            <Link
              href={`/projects/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.blogLinkPrimary}
            >
              <p className={styles.bubbleTitle}>See How I Designed It</p>
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
          {project.challenges.map((challenge) => (
            <li key={challenge._id} className={styles.challengesListItem}>
              <button className={styles.buttonChallange} onClick={() => handleScrollToChallenge(generateChallengeId(challenge.title))}>
                {challenge.title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No challenges faced for this project.</p>
      )}
                <RepoAndWebSiteButtons
  githubUrl={project.githubUrl}
  url={project.url}
  isAbsolute 
  bottom="0rem"
  right="2rem"
/>
 
   
    </div>
  );
};

export default ProjectInfos;





