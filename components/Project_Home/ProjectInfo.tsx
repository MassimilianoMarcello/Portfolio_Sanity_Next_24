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

      {/* Two columns: menu left, CTA right */}
      <div className={styles.drawerLayout}>

        {/* Left — challenge menu */}
        <div className={styles.menuSection}>
          <span className={styles.menuLabel}>Challenges</span>
          <ul className={styles.challengeList}>
            {project.challenges.map((challenge, i) => (
              <li key={challenge._id} className={styles.challengeItem}>
                <Link
                  href={`/projects/${project.slug}#${generateChallengeId(challenge.title)}`}
                  className={styles.challengeLink}
                >
                  <span className={styles.challengeNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.challengeTitle}>
                    {challenge.title}
                  </span>
                  <svg className={styles.challengeArrow} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — case study CTA */}
        <div className={styles.ctaSection}>
          <span className={styles.ctaLabel}>Full case study</span>
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Read full case study
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProjectInfos;






