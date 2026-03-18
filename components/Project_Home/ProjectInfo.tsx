import { Project } from "@/types/projects";
import Link from "next/link";
import styles from "./ProjectInfo.module.scss";

interface ProjectInfosProps {
  project: Project;
  openProjectId: string | null;
}

const ProjectInfos: React.FC<ProjectInfosProps> = ({ project }) => {
  const generateChallengeId = (title: string) =>
    `challenge-${title.replace(/\s+/g, "-").toLowerCase()}`;

  if (!project.challenges?.length) {
    return <p className={styles.empty}>No case study available yet.</p>;
  }

  return (
    <div className={styles.drawerContent}>

      {/* Header */}
      <div className={styles.drawerHeader}>
        <Link
          href={`/projects/${project.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fullCaseLink}
        >
          Read full case study
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 8L8 2M8 2H3M8 2V7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <span className={styles.statusBadge} data-status={project.status}>
          {project.status}
        </span>
      </div>

      {/* Challenges label */}
      <div className={styles.challengesLabel}>
        <span>Challenges &amp; solutions</span>
      </div>

      <ul className={styles.challengeGrid}>
        {project.challenges.map((challenge, i) => (
          <li key={challenge._id} className={styles.challengeItem}>
            <Link
              href={`/projects/${project.slug}#${generateChallengeId(challenge.title)}`}
              className={styles.challengeBtn}
            >
              <span className={styles.challengeNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {challenge.title}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ProjectInfos;






