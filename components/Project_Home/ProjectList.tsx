// components/Project_Home/ProjectList.tsx
"use client";

import React, { useMemo } from 'react';
import ProjectInfo from './ProjectInfo';
import TechnologiesUsed from './TechnologiesUsed';
import { Project } from '@/types/projects';
import { urlFor } from '@/sanity/sanity.client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectList.module.scss';

interface ProjectListProps {
  projects: Project[];
}

const CATEGORIES = [
  { value: 'main',      index: '01', kicker: 'Core',  title: 'Primary projects',   desc: 'Work that demonstrates core skills and professional capability. Each project ships to production.' },
  { value: 'secondary', index: '02', kicker: 'Depth', title: 'Secondary projects', desc: 'Complementary work that highlights versatility — different stacks, different problem domains.' },
  { value: 'sandbox',   index: '03', kicker: 'Lab',   title: 'Sandbox',            desc: 'Experiments and explorations. Where new technology meets curiosity.' },
] as const;

const STATUS_LABEL: Record<string, string> = {
  live:          'Live',
  wip:           'In progress',
  'In Progress': 'In progress',
  archived:      'Archived',
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const groupedProjects = useMemo(() =>
    projects.reduce((acc, project) => {
      if (!acc[project.importance]) acc[project.importance] = [];
      acc[project.importance].push(project);
      return acc;
    }, {} as Record<string, Project[]>),
    [projects]
  );

  const activeCategories = CATEGORIES.filter(cat => groupedProjects[cat.value]?.length);

  return (
    <div className={styles.projectListContainer}>
      <div className={styles.sectionKicker}><span>Case studies</span></div>

      {activeCategories.map((cat) => (
        <div key={cat.value} className={styles.categorySection} id={cat.value}>

          {/* Sidebar */}
          <aside className={styles.catSidebar}>
            <div className={styles.catSidebarBox}>
              <div className={styles.catLabel}>{cat.index} — {cat.kicker}</div>
              <h2 className={styles.catTitle}>{cat.title}</h2>
              <p className={styles.catDesc}>{cat.desc}</p>
            </div>
          </aside>

          {/* Cards */}
          <div className={styles.projectCards}>
            {groupedProjects[cat.value].map((project, idx) => {
              const status = project.status || 'archived';
              const hasSummary = project.problem || project.solution || project.impact;

              return (
                <article key={project._id} className={styles.projectCard}>

                  {/* Tech strip */}
                  <div className={styles.techRow}>
                    <TechnologiesUsed technologies={project.technologies} />
                  </div>

                  {/* Title — col 2, row 2 */}
                  <div className={styles.cardTitleRow}>
                    <h3 className={styles.cardTitle}>{project.name}</h3>
                  </div>

                  {/* Left: browser mockup */}
                  <div className={styles.cardLeft}>
                    <div className={styles.browserMockup}>
                      {/* Browser chrome */}
                      <div className={styles.browserBar}>
                        <div className={styles.browserDots}>
                          <span className={styles.dot} data-color="red" />
                          <span className={styles.dot} data-color="yellow" />
                          <span className={styles.dot} data-color="green" />
                        </div>
                        <div className={styles.browserUrl}>
                          {project.url
                            ? new URL(project.url).hostname
                            : project.name.toLowerCase().replace(/\s+/g, '') + '.dev'
                          }
                        </div>
                      </div>
                      {/* Screenshot */}
                      <div className={styles.browserScreen}>
                        <Image
                          className={styles.cardImg}
                          src={urlFor(project.image).width(800).url()}
                          alt={project.imageAlt || project.name}
                          width={800}
                          height={500}
                          priority={idx === 0}
                        />
                      </div>
                    </div>

                    {/* Status sotto il mockup */}
                    <div className={styles.statusPill} data-status={status}>
                      <span className={styles.statusDot} data-status={status} />
                      {STATUS_LABEL[status] ?? status}
                    </div>
                  </div>

                  {/* Right: summary + challenges + footer */}
                  <div className={styles.cardBody}>

                    {/* Problem / Solution / Impact */}
                    {hasSummary ? (
                      <div className={styles.cardSummary}>
                        {project.problem && (
                          <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Problem</span>
                            <p className={styles.summaryText}>{project.problem}</p>
                          </div>
                        )}
                        {project.solution && (
                          <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Solution</span>
                            <p className={styles.summaryText}>{project.solution}</p>
                          </div>
                        )}
                        {project.impact && (
                          <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Impact</span>
                            <p className={styles.summaryText}>{project.impact}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={styles.cardSummaryEmpty}>
                        <p>Case study coming soon.</p>
                      </div>
                    )}

                    {/* Challenges */}
                    <ProjectInfo project={project} />

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.caseStudyBtn}
                      >
                        View case study
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>

                      <div className={styles.cardLinks}>
                        {project.githubUrl && (
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 1.54545C5.94479 1.54545 1.04348 6.42167 1.04348 12.4277C1.04348 16.8374 3.6861 20.6328 7.4903 22.3403C7.88799 22.5188 8.27744 22.4482 8.58123 22.2205C8.89257 21.9871 9.11323 21.5853 9.11323 21.1128V20.5426L7.75618 20.3588C7.74631 20.3575 7.73648 20.3559 7.72671 20.354C6.97768 20.2083 6.47304 19.9453 6.10316 19.5662C5.7917 19.247 5.60192 18.8646 5.44107 18.5405C5.42204 18.5022 5.40342 18.4647 5.38505 18.4282C5.18145 18.0236 5.03633 17.7364 4.89784 17.5171C4.76321 17.304 4.65787 17.1937 4.55411 17.1249C4.28955 16.9497 4.03631 16.6531 4.03631 16.2816C4.03631 16.0778 4.1185 15.8695 4.29663 15.722C4.46448 15.583 4.66637 15.5395 4.84185 15.5395C5.06432 15.5395 5.27305 15.6076 5.44732 15.6858C5.6254 15.7657 5.80173 15.8721 5.96683 15.9821C6.36867 16.25 6.76495 16.5675 7.10004 16.9576C7.44896 17.3638 7.69554 17.6224 8.06841 17.6753C8.37359 17.7186 8.68574 17.7199 8.92914 17.7088C8.93981 17.651 8.95288 17.5898 8.96889 17.5263C8.99766 17.4123 9.03798 17.2829 9.09513 17.149C8.81903 17.0842 8.51955 16.9997 8.21846 16.8929C7.56371 16.6607 6.83548 16.3005 6.34535 15.7526C5.80695 15.1508 5.47376 14.6145 5.28766 13.9858C5.10653 13.3739 5.07692 12.7113 5.07692 11.8945C5.07692 10.6456 5.61813 9.59213 6.02356 9.03344C5.89031 8.60808 5.7509 8.05573 5.68912 7.53172C5.65119 7.20991 5.63878 6.86932 5.68999 6.56435C5.73929 6.27079 5.86521 5.91105 6.19386 5.69335C6.51135 5.48304 6.88251 5.49165 7.17256 5.54637C7.47424 5.60328 7.78715 5.72824 8.07491 5.87064C8.5435 6.10253 9.00981 6.41322 9.35917 6.67557C9.96146 6.49867 11.0262 6.27125 11.9886 6.25009C11.9962 6.24993 12.0038 6.24993 12.0114 6.25009C12.9746 6.27127 13.9923 6.49865 14.5789 6.67472C14.9281 6.41255 15.3939 6.10228 15.862 5.87064C16.1498 5.72824 16.4627 5.60328 16.7644 5.54637C17.0544 5.49165 17.4256 5.48304 17.7431 5.69335C18.0717 5.91105 18.1976 6.27079 18.2469 6.56435C18.2981 6.86932 18.2857 7.20991 18.2478 7.53172C18.186 8.05573 18.0466 8.60808 17.9134 9.03344C18.3188 9.59213 18.86 10.6456 18.86 11.8945C18.86 12.7113 18.8304 13.3739 18.6493 13.9858C18.4632 14.6145 18.13 15.1508 17.5916 15.7526C17.1015 16.3005 16.3732 16.6607 15.7185 16.8929C15.3488 17.024 14.9816 17.1215 14.6571 17.1902C14.78 17.562 14.8237 17.863 14.8237 18.0357V21.1255C14.8237 21.5964 15.043 21.9975 15.3532 22.2314C15.656 22.4598 16.0446 22.5319 16.4424 22.3567C20.2814 20.6648 22.9565 16.8603 22.9565 12.4277C22.9565 6.42167 18.0552 1.54545 12 1.54545Z" fill="currentColor"/>
                            </svg>
                            GitHub
                          </Link>
                        )}
                        {project.url && (
                          <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                            <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
                              <path d="M14 2H5.50003L4.00003 3.5L6.83581 6.33579L0.585815 12.5858L3.41424 15.4142L9.66424 9.16421L12.5 12L14 10.5L14 2Z" fill="currentColor"/>
                            </svg>
                            Live
                          </Link>
                        )}
                      </div>
                    </div>

                  </div>
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