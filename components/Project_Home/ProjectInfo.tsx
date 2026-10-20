// components/Project_Home/ProjectInfo.tsx
import Link from "next/link";
import type { Project } from "@/types/projects";
import { challengeId } from "@/lib/challengeId";
import { resolveSlug } from "@/lib/projects";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./ProjectInfo.module.scss";

interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  if (!project.challenges?.length) return null;

  const slug = resolveSlug(project.slug);

  return (
    <div className={styles.challengesBlock}>
      <Eyebrow id={`challenges-${slug}`}>Key challenges</Eyebrow>
      <ol className={styles.challengeList} aria-labelledby={`challenges-${slug}`}>
        {project.challenges.map((challenge, i) => (
          <li key={challenge._id} className={styles.challengeItem}>
            <Link href={`/projects/${slug}#${challengeId(challenge, i)}`} className={styles.challengeLink}>
              <span className={styles.challengeNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.challengeTitle}>{challenge.title}</span>
              <ArrowRightIcon className={styles.challengeArrow} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProjectInfo;
