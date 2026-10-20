// components/Project_Home/ProjectList.tsx
// Server Component: niente React.memo / useMemo (non c'è mai un re-render da evitare).
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

const KNOWN: readonly string[] = CATEGORIES.map((c) => c.value);
const FALLBACK = "sandbox";

function groupByImportance(projects: Project[]) {
  const grouped: Record<string, Project[]> = {};
  for (const project of projects) {
    let key: string = project.importance;
    if (!KNOWN.includes(key)) {
      // Prima questi progetti sparivano senza avviso. Ora finiscono in Sandbox e in dev si vede il warning.
      if (process.env.NODE_ENV === "development") {
        console.warn(`[ProjectList] "${project.name}": importance "${key}" non riconosciuta → ${FALLBACK}`);
      }
      key = FALLBACK;
    }
    (grouped[key] ??= []).push(project);
  }
  return grouped;
}

export default function ProjectList({ projects }: ProjectListProps) {
  const grouped = groupByImportance(projects);
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
}
