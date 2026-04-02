// components/Project_Home/ProjectInfo.tsx
import { Project } from "@/types/projects";
import Link from "next/link";
import styles from "./ProjectInfo.module.scss";

interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  const resolveSlug = (slug: string | { current: string } | undefined) =>
    typeof slug === "string" ? slug : slug?.current ?? "";

  if (!project.challenges?.length) return null;

  return (
    <div className={styles.challengesBlock}>
      <span className={styles.menuLabel}>Key challenges</span>
      <ul className={styles.challengeList}>
        {project.challenges.map((challenge, i) => (
          <li key={challenge._id} className={styles.challengeItem}>
            <Link
              href={`/projects/${resolveSlug(project.slug)}#challenge-${resolveSlug(challenge.slug)}`}
              className={styles.challengeLink}
            >
              <span className={styles.challengeNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.challengeTitle}>
                {challenge.title}
              </span>
              <svg
                className={styles.challengeArrow}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6H10M10 6L6 2M10 6L6 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectInfo;






