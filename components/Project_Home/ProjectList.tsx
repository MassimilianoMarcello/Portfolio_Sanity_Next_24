import React, { useState, useMemo } from "react";
import ProjectInfo from "./ProjectInfo";
import TechnologiesUsed from "./TechnologiesUsed";
import { PortableText } from "@portabletext/react";
import { Project } from "@/types/projects";
import CategoryFilter from "./CategoryFilter";
import styles from "./ProjectList.module.scss";
import Link from "next/link";
import Image from "next/image";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleProjectInfo = (projectId: string) => {
    if (openProjectId === projectId) {
      setIsExiting(true);
      setTimeout(() => {
        setOpenProjectId(null);
        setIsExiting(false);
      }, 500); // Tempo dell'animazione
    } else {
      setOpenProjectId(projectId);
    }
  };

  const handleMouseLeave = () => {
    setIsExiting(true);
    setTimeout(() => {
      setOpenProjectId(null);
      setIsExiting(false);
    }, 200); // Tempo dell'animazione
  };

  // Filtra i progetti in base alla categoria selezionata
  const filteredProjects = useMemo(() => {
    if (selectedCategory) {
      return projects.filter((project) => project.importance === selectedCategory);
    }
    return projects;
  }, [projects, selectedCategory]);

  const groupedProjects = filteredProjects.reduce((acc, project) => {
    if (!acc[project.importance]) {
      acc[project.importance] = [];
    }
    acc[project.importance].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const importanceOrder = ["main", "secondary", "testing"];
  const sortedCategories = importanceOrder.filter((category) => groupedProjects[category]);

  return (
    <div className={styles.projectListContainer}>
      {/* Filtro per categoria */}
      {/* <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        importanceOrder={importanceOrder}
      /> */}

      {/* Lista dei progetti */}
      {sortedCategories.map((category, index) => (
        <div
          key={category}
          className={`${styles.categorySection} ${styles.fadeIn}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className={styles.categoryLabel}>{category.toUpperCase()}</div>
          <div className={styles.projectCards}>
            {groupedProjects[category]?.map((project) => (
              <div
                key={project._id}
                className={styles.projectCard}
                onClick={() => toggleProjectInfo(project._id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.boxTextProject}>
                  <h3>{project.name.toUpperCase()}</h3>
                  <div className={styles.portableStyle}>
                    <PortableText value={project.content[0]} />
                  </div>
                </div>
                <div className={styles.boxImageProject}>
                  <img
                    className={styles.projectImage}
                    src={project.image}
                    alt={project.imageAlt}
                  />
                </div>
                <div className={styles.visitRepoAndWebsiteButtons}>
                  <div className={styles.styledButtonGit}>
                    <Link href={project.githubUrl}>GitHub</Link>
                    <Image src="/github.svg" alt="external link" width={28} height={28} />
                  </div>
                  <div className={styles.styledButtonWebsite}>
                    <Link href={project.url}>Visit Website
                    <Image src="/forward.svg" alt="external link" width={20} height={20} />
                    </Link>
                  </div>
                </div>
                <div className={styles.technologiesUsed}>
                  <TechnologiesUsed technologies={project.technologies} />
                </div>
                {openProjectId === project._id && (
                  <div
                    className={`${styles.infoBubble} ${
                      isExiting ? styles.exit : ""
                    }`}
                  >
                    <ProjectInfo project={project} openProjectId={openProjectId} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProjectList);







