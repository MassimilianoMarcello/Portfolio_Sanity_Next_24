// components/Project_Home/ProjectCard.tsx
// La card deve bastare a un lettore non tecnico: titolo, esito (Impact), prova (screenshot), problema/soluzione.
// Le challenge vivono nel case study: qui compare solo il loro numero dentro il bottone.
import Image from "next/image";
import type { Project } from "@/types/projects";
import { getImageUrl, getHostname, normalizeStatus, resolveSlug } from "@/lib/projects";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import StatusPill from "@/components/ui/StatusPill";
import { ArrowUpRightIcon, ExternalIcon, GitHubIcon } from "@/components/ui/icons";
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
  const challengeCount = project.challenges?.length ?? 0;
  const challengeLabel = `${challengeCount} key challenge${challengeCount === 1 ? "" : "s"}`;

  return (
    <article id={`project-${slug}`} className={styles.card}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{project.name}</h3>
          {status && <StatusPill status={status} />}
        </div>

        <TechnologiesUsed technologies={project.technologies} />

        {project.impact && (
          <div className={styles.impact}>
            <Eyebrow variant="accent">Impact</Eyebrow>
            <p className={styles.impactText}>{project.impact}</p>
          </div>
        )}
      </header>

      <div className={styles.contentRow}>
        <div className={styles.media}>
          {/* Barra del browser solo se esiste un sito live: niente host inventato per librerie o progetti senza URL */}
          <BrowserFrame
            variant={project.url ? "browser" : "bare"}
            host={project.url ? getHostname(project.url, project.name) : undefined}
          >
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

      <footer className={styles.footer}>
        {slug && (
          <Button
            href={`/projects/${slug}`}
            variant="primary"
            iconAfter={<ArrowUpRightIcon />}
            aria-label={
              challengeCount > 0
                ? `View case study: ${project.name}, ${challengeLabel}`
                : `View case study: ${project.name}`
            }
          >
            View case study
            {challengeCount > 0 && <span className={styles.buttonMeta}>· {challengeLabel}</span>}
          </Button>
        )}
        <div className={styles.links}>
          {project.githubUrl && (
            <Button href={project.githubUrl} external icon={<GitHubIcon />} aria-label={`GitHub repository: ${project.name}`}>
              GitHub
            </Button>
          )}
          {project.url && (
            <Button href={project.url} external icon={<ExternalIcon />} aria-label={`Live site: ${project.name}`}>
              Live
            </Button>
          )}
        </div>
      </footer>
    </article>
  );
}
