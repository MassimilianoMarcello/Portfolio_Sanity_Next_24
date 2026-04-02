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
              <div className={styles.catSidebarBox}>
                  <div className={styles.catLabel}>{cat.index} — {cat.kicker}</div>
              <h2 className={styles.catTitle}>{cat.title}</h2>
              <p className={styles.catDesc}>{cat.desc}</p>
              </div>
            
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
                      <div className={styles.statusPill} data-status={status}>
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
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 1.54545C5.94479 1.54545 1.04348 6.42167 1.04348 12.4277C1.04348 16.8374 3.6861 20.6328 7.4903 22.3403C7.88799 22.5188 8.27744 22.4482 8.58123 22.2205C8.89257 21.9871 9.11323 21.5853 9.11323 21.1128V20.5426L7.75618 20.3588C7.74631 20.3575 7.73648 20.3559 7.72671 20.354C6.97768 20.2083 6.47304 19.9453 6.10316 19.5662C5.7917 19.247 5.60192 18.8646 5.44107 18.5405C5.42204 18.5022 5.40342 18.4647 5.38505 18.4282C5.18145 18.0236 5.03633 17.7364 4.89784 17.5171C4.76321 17.304 4.65787 17.1937 4.55411 17.1249C4.28955 16.9497 4.03631 16.6531 4.03631 16.2816C4.03631 16.0778 4.1185 15.8695 4.29663 15.722C4.46448 15.583 4.66637 15.5395 4.84185 15.5395C5.06432 15.5395 5.27305 15.6076 5.44732 15.6858C5.6254 15.7657 5.80173 15.8721 5.96683 15.9821C6.36867 16.25 6.76495 16.5675 7.10004 16.9576C7.44896 17.3638 7.69554 17.6224 8.06841 17.6753C8.37359 17.7186 8.68574 17.7199 8.92914 17.7088C8.93981 17.651 8.95288 17.5898 8.96889 17.5263C8.99766 17.4123 9.03798 17.2829 9.09513 17.149C8.81903 17.0842 8.51955 16.9997 8.21846 16.8929C7.56371 16.6607 6.83548 16.3005 6.34535 15.7526C5.80695 15.1508 5.47376 14.6145 5.28766 13.9858C5.10653 13.3739 5.07692 12.7113 5.07692 11.8945C5.07692 10.6456 5.61813 9.59213 6.02356 9.03344C5.89031 8.60808 5.7509 8.05573 5.68912 7.53172C5.65119 7.20991 5.63878 6.86932 5.68999 6.56435C5.73929 6.27079 5.86521 5.91105 6.19386 5.69335C6.51135 5.48304 6.88251 5.49165 7.17256 5.54637C7.47424 5.60328 7.78715 5.72824 8.07491 5.87064C8.5435 6.10253 9.00981 6.41322 9.35917 6.67557C9.96146 6.49867 11.0262 6.27125 11.9886 6.25009C11.9962 6.24993 12.0038 6.24993 12.0114 6.25009C12.9746 6.27127 13.9923 6.49865 14.5789 6.67472C14.9281 6.41255 15.3939 6.10228 15.862 5.87064C16.1498 5.72824 16.4627 5.60328 16.7644 5.54637C17.0544 5.49165 17.4256 5.48304 17.7431 5.69335C18.0717 5.91105 18.1976 6.27079 18.2469 6.56435C18.2981 6.86932 18.2857 7.20991 18.2478 7.53172C18.186 8.05573 18.0466 8.60808 17.9134 9.03344C18.3188 9.59213 18.86 10.6456 18.86 11.8945C18.86 12.7113 18.8304 13.3739 18.6493 13.9858C18.4632 14.6145 18.13 15.1508 17.5916 15.7526C17.1015 16.3005 16.3732 16.6607 15.7185 16.8929C15.3488 17.024 14.9816 17.1215 14.6571 17.1902C14.78 17.562 14.8237 17.863 14.8237 18.0357V21.1255C14.8237 21.5964 15.043 21.9975 15.3532 22.2314C15.656 22.4598 16.0446 22.5319 16.4424 22.3567C20.2814 20.6648 22.9565 16.8603 22.9565 12.4277C22.9565 6.42167 18.0552 1.54545 12 1.54545ZM9.47621 18.7103C9.21695 18.7474 9.47471 18.7106 9.47471 18.7106L9.47202 18.7109L9.46363 18.7121L9.43515 18.7157C9.41116 18.7187 9.37728 18.7227 9.33492 18.727C9.25033 18.7356 9.13113 18.7458 8.98854 18.7526C8.70624 18.766 8.31904 18.7667 7.92203 18.7104C7.13052 18.598 6.65046 18.0378 6.33885 17.6742C6.32876 17.6624 6.31886 17.6509 6.30913 17.6395C6.20907 17.523 6.09953 17.4125 5.98201 17.307C6.08533 17.4975 6.19176 17.709 6.3068 17.9376L6.31681 17.9575C6.33465 17.993 6.35183 18.0273 6.36849 18.0605C6.54298 18.4089 6.65892 18.6403 6.8493 18.8354C7.03478 19.0255 7.32532 19.2089 7.91124 19.3249L9.70488 19.5678C9.96366 19.6029 10.1567 19.8242 10.1567 20.0858V21.1128C10.1567 21.9133 9.78216 22.6259 9.2064 23.0575C8.62309 23.4948 7.83355 23.64 7.06368 23.2944C2.90196 21.4265 0 17.2686 0 12.4277C0 5.83613 5.37667 0.5 12 0.5C18.6233 0.5 24 5.83613 24 12.4277C24 17.2954 21.0612 21.4633 16.8625 23.3136C16.0929 23.6528 15.3063 23.5045 14.7257 23.0667C14.1525 22.6344 13.7802 21.9234 13.7802 21.1255V18.0357C13.7802 17.9657 13.7313 17.5614 13.4577 17.0177C13.3807 16.8647 13.3834 16.6837 13.4649 16.5331C13.5465 16.3826 13.6965 16.2816 13.8664 16.2628C14.2086 16.225 14.787 16.1142 15.3703 15.9074C15.9643 15.6967 16.4974 15.4094 16.8145 15.0549C17.2852 14.5287 17.5196 14.1251 17.6489 13.6885C17.7831 13.2351 17.8165 12.7071 17.8165 11.8945C17.8165 10.7538 17.2169 9.79498 16.9407 9.48618C16.8134 9.34393 16.7737 9.14346 16.8372 8.96333C16.9762 8.56877 17.147 7.95628 17.2115 7.4091C17.244 7.13351 17.2458 6.90386 17.2179 6.7378C17.1992 6.6261 17.1738 6.57992 17.1641 6.56531C17.1461 6.56043 17.087 6.54932 16.9575 6.57376C16.7872 6.60589 16.5703 6.68615 16.3241 6.80799C15.8345 7.05026 15.3246 7.40853 15.0077 7.66438C14.8659 7.77889 14.6747 7.81099 14.5034 7.74908C14.1011 7.60372 13.0026 7.31957 12 7.29555C10.9929 7.31966 9.8314 7.60534 9.43357 7.74908C9.26222 7.81099 9.07104 7.77889 8.92921 7.66438C8.6123 7.40853 8.1024 7.05026 7.61281 6.80799C7.3666 6.68615 7.14974 6.60589 6.97947 6.57376C6.84991 6.54932 6.79082 6.56043 6.77288 6.56531C6.76313 6.57992 6.73777 6.6261 6.71901 6.7378C6.69113 6.90386 6.69291 7.13351 6.7254 7.4091C6.7899 7.95628 6.96075 8.56877 7.09974 8.96333C7.16319 9.14346 7.12352 9.34393 6.99626 9.48618C6.72 9.79498 6.1204 10.7538 6.1204 11.8945C6.1204 12.7071 6.15386 13.2351 6.28807 13.6885C6.4173 14.1251 6.65172 14.5287 7.1224 15.0549C7.43953 15.4094 7.97265 15.6967 8.56664 15.9074C9.14989 16.1142 9.72837 16.225 10.0705 16.2628C10.2856 16.2865 10.4637 16.4408 10.5182 16.6505C10.5728 16.8602 10.4925 17.082 10.3165 17.2079C10.1511 17.3261 10.0423 17.5378 9.98056 17.7825C9.95142 17.898 9.93711 18.0043 9.93027 18.0813C9.92688 18.1194 9.92543 18.1492 9.92481 18.1679L9.92437 18.1869C9.92729 18.4492 9.73547 18.6733 9.47621 18.7103Z" fill="currentColor"/>
                              </svg>
                              GitHub
                            </Link>
                          )}
                          {project.url && (
                            <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                              <svg width="9" height="9" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H5.50003L4.00003 3.5L6.83581 6.33579L0.585815 12.5858L3.41424 15.4142L9.66424 9.16421L12.5 12L14 10.5L14 2Z" fill="currentColor"/>
                              </svg>
                              Live
                            </Link>
                          )}
                        </div>

                        <button
                          className={`${styles.caseStudyBtn} ${isOpen && !isMobile ? styles.caseStudyOpen : ''}`}
                          onClick={() => handleToggle(project._id)}
                          aria-expanded={isOpen}
                        >
                          {isOpen && !isMobile ? 'Close' : 'Case study'}
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path
                              d={isOpen && !isMobile ? "M2 2L10 10M10 2L2 10" : "M6 1V11M1 6H11"}
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Drawer — nascosto su mobile via CSS */}
                    <div className={`${styles.drawer} ${isOpen && !isExiting ? styles.drawerOpen : ''} ${isExiting ? styles.drawerExit : ''}`}>
                      <div className={styles.drawerInner}>
                        <ProjectInfo project={project} openProjectId={openProjectId} />
                      </div>
                    </div>

                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile fullscreen panel — sempre nel DOM, CSS gestisce visibilità */}
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
          <div className={styles.mobilePanelFooter}>
            <button
              className={styles.mobilePanelCloseBar}
              onClick={() => openProjectId && handleToggle(openProjectId)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Close
            </button>
          </div>
        </div>
      </>
    </>
  );
};

export default React.memo(ProjectList);