import { Project } from "@/types/projects";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ProjectInfo.module.scss";

interface ProjectInfosProps {
  project: Project;
  openProjectId: string | null;
}

const ProjectInfos: React.FC<ProjectInfosProps> = ({ project }) => {
  const router = useRouter();

  const generateChallengeId = (title: string) =>
    `challenge-${title.replace(/\s+/g, "-").toLowerCase()}`;

  const handleScrollToChallenge = (challengeId: string) => {
    // Push first, then observe DOM readiness via requestAnimationFrame
    router.push(`/projects/${project.slug}`);
    const attempt = (retries: number) => {
      requestAnimationFrame(() => {
        const el = document.getElementById(challengeId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (retries > 0) {
          attempt(retries - 1);
        }
      });
    };
    // Give the page a few frames to mount after navigation
    setTimeout(() => attempt(10), 100);
  };

  if (!project.challenges?.length) {
    return <p className={styles.empty}>No case study available yet.</p>;
  }

  return (
    <div className={styles.drawerContent}>
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
        <span className={styles.statusBadge}>Status: {project.status}</span>
      </div>

      <div className={styles.challengesLabel}>Challenges &amp; solutions</div>
      <ul className={styles.challengeGrid}>
        {project.challenges.map((challenge, i) => (
          <li key={challenge._id} className={styles.challengeItem}>
            <button
              className={styles.challengeBtn}
              onClick={() =>
                handleScrollToChallenge(generateChallengeId(challenge.title))
              }
            >
              <span className={styles.challengeNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {challenge.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectInfos;






