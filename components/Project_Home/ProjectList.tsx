"use client";

import React, { useMemo, useCallback, useState, useRef } from 'react';
import ProjectInfo from './ProjectInfo';
import TechnologiesUsed from './TechnologiesUsed';
import { PortableText } from '@portabletext/react';
import { Project } from '@/types/projects';
import { urlFor } from '@/sanity/sanity.client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectList.module.scss';

interface ProjectListProps {
  projects: Project[];
  openProjectId: string | null;
  toggleProjectInfo: (projectId: string | null) => void;
}

const CATEGORIES = [
  {
    value: 'main',
    index: '01',
    kicker: 'Core',
    title: 'Primary projects',
    desc: 'Work that demonstrates core skills and professional capability. Each project ships to production.',
  },
  {
    value: 'secondary',
    index: '02',
    kicker: 'Depth',
    title: 'Secondary projects',
    desc: 'Complementary work that highlights versatility — different stacks, different problem domains.',
  },
  {
    value: 'sandbox',
    index: '03',
    kicker: 'Lab',
    title: 'Sandbox',
    desc: 'Experiments and explorations. Where new technology meets curiosity.',
  },
] as const;

const STATUS_LABEL: Record<string, string> = {
  live:     'Live',
  wip:      'In progress',
  archived: 'Archived',
};

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  openProjectId,
  toggleProjectInfo,
}) => {
  const [exitingId, setExitingId] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = useCallback(
    (projectId: string) => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (openProjectId === projectId) {
        setExitingId(projectId);
        setTimeout(() => { toggleProjectInfo(null); setExitingId(null); }, 280);
      } else {
        toggleProjectInfo(projectId);
      }
    },
    [openProjectId, toggleProjectInfo]
  );

  const handleMouseLeave = useCallback(
    (projectId: string) => {
      if (openProjectId !== projectId) return;
      closeTimerRef.current = setTimeout(() => {
        setExitingId(projectId);
        setTimeout(() => { toggleProjectInfo(null); setExitingId(null); }, 280);
      }, 1500);
    },
    [openProjectId, toggleProjectInfo]
  );

  const handleMouseEnter = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const groupedProjects = useMemo(
    () => projects.reduce((acc, project) => {
      if (!acc[project.importance]) acc[project.importance] = [];
      acc[project.importance].push(project);
      return acc;
    }, {} as Record<string, Project[]>),
    [projects]
  );

  const activeCategories = CATEGORIES.filter(cat => groupedProjects[cat.value]?.length);

  return (
    <div className={styles.projectListContainer}>

      <div className={styles.sectionKicker}>
        <span>Case studies</span>
      </div>

      {activeCategories.map((cat) => (
        <div key={cat.value} className={styles.categorySection} id={cat.value}>
          <aside className={styles.catSidebar}>
            <div className={styles.catLabel}>{cat.index} — {cat.kicker}</div>
            <h2 className={styles.catTitle}>{cat.title}</h2>
            <p className={styles.catDesc}>{cat.desc}</p>
          </aside>

          <div className={styles.projectCards}>
            {groupedProjects[cat.value].map((project, idx) => {
              const isOpen    = openProjectId === project._id;
              const isExiting = exitingId === project._id;
              const status    = project.status || 'archived';

              return (
                <article
                  key={project._id}
                  className={`${styles.projectCard} ${isOpen ? styles.cardOpen : ''}`}
                  onMouseLeave={() => handleMouseLeave(project._id)}
                  onMouseEnter={handleMouseEnter}
                >
                  {/* Technologies — spans full top, grid-column 1 / -1 */}
                  <div className={styles.techRow}>
                    <TechnologiesUsed technologies={project.technologies} />
                  </div>

                  {/* Image */}
                  <div className={styles.cardImageWrap}>
                    <Image
                      className={styles.cardImg}
                      src={urlFor(project.image).width(600).height(450).fit('crop').url()}
                      alt={project.imageAlt || project.name}
                      width={600}
                      height={450}
                      priority={idx === 0}
                    />
                    <span className={styles.cardYear}>
                      {new Date(project._createdAt || Date.now()).getFullYear()}
                    </span>
                  </div>

                  {/* Body */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <h3 className={styles.cardTitle}>{project.name}</h3>
                      <div className={styles.cardDesc}>
                        <PortableText value={project.content} />
                      </div>
                    </div>

                    <div className={styles.cardMeta}>
                      <div className={styles.cardFooter}>
                        <div className={styles.cardLinks}>
                          {project.githubUrl && (
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.actionLink}
                            >
                              GitHub ↗
                            </Link>
                          )}
                          {project.url && (
                            <Link
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.actionLink}
                            >
                              Live ↗
                            </Link>
                          )}
                          <button
                            className={styles.caseStudyBtn}
                            onClick={() => handleToggle(project._id)}
                            aria-expanded={isOpen}
                          >
                            {isOpen ? 'Close ↑' : 'Case study ↓'}
                          </button>
                        </div>

                        <div className={styles.statusPill}>
                          <span className={styles.statusDot} data-status={status} />
                          {STATUS_LABEL[status] ?? status}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Drawer */}
                  <div className={`${styles.drawer} ${isOpen && !isExiting ? styles.drawerOpen : ''} ${isExiting ? styles.drawerExit : ''}`}>
                    <div className={styles.drawerInner}>
                      <ProjectInfo project={project} openProjectId={openProjectId} />
                    </div>
                  </div>

                  {/* Toggle */}
                  <button
                    className={`${styles.toggleIcon} ${isOpen ? styles.toggleOpen : ''}`}
                    onClick={() => handleToggle(project._id)}
                    aria-label={isOpen ? 'Close case study' : 'Open case study'}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProjectList);















