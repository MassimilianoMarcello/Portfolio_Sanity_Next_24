// components/Project_Home/ProjectCard.tsx
import Image from "next/image";
import type { Project } from "@/types/projects";
import { getHostname, getImageUrl, normalizeStatus, resolveSlug } from "@/lib/projects";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import StatusPill from "@/components/ui/StatusPill";
import { ArrowUpRightIcon, ExternalIcon, GitHubIcon } from "@/components/ui/icons";
import ProjectInfo from "./ProjectInfo";
import TechnologiesUsed from "./TechnologiesUsed";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  project: Project;
  /** true solo per la prima immagine dell'intera pagina (LCP). */
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const slug = resolveSlug(project.slug);
  const status = normalizeStatus(project.status);
  const imageUrl = getImageUrl(project.image);
  const hasSummary = Boolean(project.problem || project.solution);

  return (
    <article id={`project-${slug}`} className={styles.card}>
      <div className={styles.techRow}>
        <TechnologiesUsed technologies={project.technologies} />
      </div>

      <header className={styles.titleRow}>
        <h3 className={styles.title}>{project.name}</h3>
        {status && <StatusPill status={status} />}
      </header>

      <div className={styles.contentRow}>
        <div className={styles.media}>
          <BrowserFrame host={getHostname(project.url, project.name)}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={project.imageAlt || project.name}
                width={1200}
                height={750}
                sizes="(max-width: 900px) 100vw, 55vw"
                priority={priority}
              />
            ) : (
              <div className={styles.imageFallback}>Preview unavailable</div>
            )}
          </BrowserFrame>
        </div>

        <div className={styles.body}>
          {hasSummary ? (
            <>
              {project.problem && (
                <div className={styles.summaryRow}>
                  <Eyebrow>Problem</Eyebrow>
                  <p className={styles.text}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className={styles.summaryRow}>
                  <Eyebrow>Solution</Eyebrow>
                  <p className={styles.text}>{project.solution}</p>
                </div>
              )}
            </>
          ) : (
            <p className={styles.empty}>Case study coming soon.</p>
          )}
        </div>
      </div>

      {project.impact && (
        <div className={styles.impact}>
          <Eyebrow variant="accent">Impact</Eyebrow>
          <p className={styles.impactText}>{project.impact}</p>
        </div>
      )}

      <ProjectInfo project={project} />

      <footer className={styles.footer}>
        {slug && (
          <Button
            href={`/projects/${slug}`}
            variant="primary"
            iconAfter={<ArrowUpRightIcon />}
            aria-label={`View case study: ${project.name}`}
          >
            View case study
          </Button>
        )}
        <div className={styles.links}>
          {project.githubUrl && (
            <Button
              href={project.githubUrl}
              external
              icon={<GitHubIcon />}
              aria-label={`GitHub repository: ${project.name}`}
            >
              GitHub
            </Button>
          )}
          {project.url && (
            <Button
              href={project.url}
              external
              icon={<ExternalIcon />}
              aria-label={`Live site: ${project.name}`}
            >
              Live
            </Button>
          )}
        </div>
      </footer>
    </article>
  );
}
