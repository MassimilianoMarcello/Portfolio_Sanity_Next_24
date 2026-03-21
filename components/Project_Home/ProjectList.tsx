"use client";

import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import ProjectInfo from './ProjectInfo';
import TechnologiesUsed from './TechnologiesUsed';
import { PortableText } from '@portabletext/react';
import { Project } from '@/types/projects';
import { urlFor } from '@/sanity/sanity.client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectList.module.scss';
import { portableTextComponents } from '@/app/(pages)/projects/[slug]/portableTextComponents';

interface ProjectListProps {
  projects: Project[];
  openProjectId: string | null;
  toggleProjectInfo: (projectId: string | null) => void;
}

const CATEGORIES = [
  { value: 'main',      index: '01', kicker: 'Core',  title: 'Primary projects',   desc: 'Work that demonstrates core skills and professional capability. Each project ships to production.' },
  { value: 'secondary', index: '02', kicker: 'Depth', title: 'Secondary projects', desc: 'Complementary work that highlights versatility — different stacks, different problem domains.' },
  { value: 'sandbox',   index: '03', kicker: 'Lab',   title: 'Sandbox',            desc: 'Experiments and explorations. Where new technology meets curiosity.' },
] as const;

const STATUS_LABEL: Record<string, string> = {
  live:     'Live',
  wip:      'In progress',
  archived: 'Archived',
};

const ProjectList: React.FC<ProjectListProps> = ({ projects, openProjectId, toggleProjectInfo }) => {
  const [exitingId, setExitingId]           = useState<string | null>(null);
  const [expandedDescId, setExpandedDescId] = useState<string | null>(null);
  const [isMobile, setIsMobile]             = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Lock body scroll when mobile panel is open
  useEffect(() => {
    if (isMobile && openProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, openProjectId]);

  const handleToggle = useCallback((projectId: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (openProjectId === projectId) {
      setExitingId(projectId);
      setTimeout(() => { toggleProjectInfo(null); setExitingId(null); }, 280);
    } else {
      toggleProjectInfo(projectId);
    }
  }, [openProjectId, toggleProjectInfo]);

  const handleMouseLeave = useCallback((projectId: string) => {
    if (isMobile || openProjectId !== projectId) return;
    closeTimerRef.current = setTimeout(() => {
      setExitingId(projectId);
      setTimeout(() => { toggleProjectInfo(null); setExitingId(null); }, 280);
    }, 1500);
  }, [openProjectId, toggleProjectInfo, isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const groupedProjects = useMemo(() =>
    projects.reduce((acc, project) => {
      if (!acc[project.importance]) acc[project.importance] = [];
      acc[project.importance].push(project);
      return acc;
    }, {} as Record<string, Project[]>),
    [projects]
  );

  const activeCategories = CATEGORIES.filter(cat => groupedProjects[cat.value]?.length);
  const openProject = projects.find(p => p._id === openProjectId) ?? null;

  return (
    <>
      <div className={styles.projectListContainer}>
        <div className={styles.sectionKicker}><span>Case studies</span></div>

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
                    {/* Tech strip */}
                    <div className={styles.techRow}>
                      <TechnologiesUsed technologies={project.technologies} />
                    </div>

                    {/* Title — sopra immagine su mobile */}
                    <div className={styles.cardTitleRow}>
                      <h3 className={styles.cardTitle}>{project.name}</h3>
                    </div>

                    {/* Left: image + status */}
                    <div className={styles.cardLeft}>
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
                      <div className={styles.statusPill}>
                        <span className={styles.statusDot} data-status={status} />
                        {STATUS_LABEL[status] ?? status}
                      </div>
                    </div>

                    {/* Right: desc + actions */}
                    <div className={styles.cardBody}>
                      <div className={styles.cardTop}>
                        <div className={`${styles.cardDesc} ${expandedDescId === project._id ? styles.cardDescExpanded : ''}`}>
                          <PortableText value={project.content} components={portableTextComponents} />
                        </div>
                        <button
                          className={`${styles.readMoreBtn} ${expandedDescId === project._id ? styles.readMoreExpanded : ''}`}
                          onClick={() => setExpandedDescId(prev => prev === project._id ? null : project._id)}
                        >
                          {expandedDescId === project._id ? 'Show less' : 'Continue reading'}
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>

                      <div className={styles.cardFooter}>
                        <div className={styles.cardLinks}>
                          {project.githubUrl && (
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                              GitHub ↗
                            </Link>
                          )}
                          {project.url && (
                            <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                              Live ↗
                            </Link>
                          )}
                        </div>

                        <button
                          className={`${styles.caseStudyBtn} ${isOpen && !isMobile ? styles.caseStudyOpen : ''}`}
                          onClick={() => handleToggle(project._id)}
                          aria-expanded={isOpen}
                        >
                          Case study
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Drawer — desktop only */}
                    {!isMobile && (
                      <div className={`${styles.drawer} ${isOpen && !isExiting ? styles.drawerOpen : ''} ${isExiting ? styles.drawerExit : ''}`}>
                        <div className={styles.drawerInner}>
                          <ProjectInfo project={project} openProjectId={openProjectId} />
                        </div>
                      </div>
                    )}

                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile fullscreen panel */}
      {isMobile && (
        <>
          <div
            className={`${styles.mobileOverlay} ${openProjectId && !exitingId ? styles.mobileOverlayVisible : ''}`}
            onClick={() => openProjectId && handleToggle(openProjectId)}
          />
          <div className={`${styles.mobilePanel} ${openProjectId && !exitingId ? styles.mobilePanelOpen : ''}`}>
            <div className={styles.mobilePanelHeader}>
              <span className={styles.mobilePanelTitle}>
                {openProject?.name ?? ''}
              </span>
              <button
                className={styles.mobilePanelClose}
                onClick={() => openProjectId && handleToggle(openProjectId)}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.mobilePanelBody}>
              {openProject && (
                <ProjectInfo project={openProject} openProjectId={openProjectId} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(ProjectList);