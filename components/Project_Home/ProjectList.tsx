// components/Project_Home/ProjectList.tsx
import React, { useMemo } from "react";
import type { CSSProperties } from "react";
import type { Project } from "@/types/projects";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectList.module.scss";

interface ProjectListProps {
  projects: Project[];
}

const CATEGORIES = [
  { value: "main",      kicker: "Core",  title: "Primary projects",   desc: "Work that demonstrates core skills and professional capability. Each project ships to production." },
  { value: "secondary", kicker: "Depth", title: "Secondary projects", desc: "Complementary work that highlights versatility — different stacks, different problem domains." },
  { value: "sandbox",   kicker: "Lab",   title: "Sandbox",            desc: "Experiments and explorations. Where new technology meets curiosity." },
] as const;

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const grouped = useMemo(
    () =>
      projects.reduce<Record<string, Project[]>>((acc, project) => {
        (acc[project.importance] ??= []).push(project);
        return acc;
      }, {}),
    [projects]
  );

  const activeCategories = CATEGORIES.filter((cat) => grouped[cat.value]?.length);

  return (
    <div className={styles.projectListContainer}>
      <div className={styles.sectionKicker}><span>Case studies</span></div>

      <div className={styles.categories}>
        {activeCategories.map((cat, catIndex) => {
          const headingId = `category-${cat.value}`;
          return (
            <section
              key={cat.value}
              id={cat.value}
              aria-labelledby={headingId}
              className={styles.categorySection}
              // la fascia colorata dipende dall'indice tra le categorie attive, non dalla posizione nel DOM
              data-tone={catIndex % 2 === 1 ? "tinted" : "plain"}
              style={{ "--i": catIndex } as CSSProperties}
            >
              <div className={styles.catHeader}>
                <Eyebrow variant="muted">{cat.kicker}</Eyebrow>
                <h2 id={headingId} className={styles.catTitle}>{cat.title}</h2>
                <p className={styles.catDesc}>{cat.desc}</p>
              </div>

              <div className={styles.projectCards}>
                {grouped[cat.value].map((project, idx) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    priority={catIndex === 0 && idx === 0}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ProjectList);
