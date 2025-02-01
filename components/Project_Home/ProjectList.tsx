import React, { useMemo, useCallback } from "react";
import ProjectInfo from "./ProjectInfo";
import TechnologiesUsed from "./TechnologiesUsed";
import { PortableText } from "@portabletext/react";
import { Project } from "@/types/projects";
import TriangleIcon from "../ΩΩElements/TriangleIcon";
import { urlFor } from "@/sanity/sanity.client";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectList.module.scss";

interface ProjectListProps {
  projects: Project[];
  openProjectId: string | null;
  toggleProjectInfo: (projectId: string | null) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, openProjectId, toggleProjectInfo }) => {
  const [isExiting, setIsExiting] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const toggleProjectInfoHandler = useCallback((projectId: string) => {
    if (openProjectId === projectId) {
      setIsExiting(true);
      setTimeout(() => {
        toggleProjectInfo(null);
        setIsExiting(false);
      }, 500);
    } else {
      toggleProjectInfo(projectId);
    }
  }, [openProjectId, toggleProjectInfo]);

  const handleMouseLeave = () => {
    setIsExiting(true);
    setTimeout(() => {
      toggleProjectInfo(null);
      setIsExiting(false);
    }, 200);
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory) {
      return projects.filter((project) => project.importance === selectedCategory);
    }
    return projects;
  }, [projects, selectedCategory]);

  const groupedProjects = useMemo(() => {
    return filteredProjects.reduce((acc, project) => {
      if (!acc[project.importance]) {
        acc[project.importance] = [];
      }
      acc[project.importance].push(project);
      return acc;
    }, {} as Record<string, Project[]>);
  }, [filteredProjects]);

  const importanceOrder = ["main", "secondary", "sandbox"];
  const sortedCategories = importanceOrder.filter((category) => groupedProjects[category]);

  const categoryDescriptions: Record<string, string> = {
    "main": "Projects that demonstrate core skills and expertise, serving as the strongest examples of professional capabilities.",
    "secondary": "Projects that showcase additional skills and knowledge, complementing the main projects by highlighting versatility and depth.",
    "sandbox": "Projects focused on exploring and experimenting with new technologies, providing a foundation for innovation in future work.",
  };

  return (
    <div className={styles.projectListContainer}>
      {sortedCategories.map((category, index) => (
        <div
          key={category}
          id={category}
          className={`${styles.categorySection} ${styles.fadeIn}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className={styles.categoryLabel}>
            {category.toUpperCase()}
            <p className={styles.categoryDescription}>{categoryDescriptions[category]}</p>
          </div>

          <div className={styles.projectCards}>
            {groupedProjects[category]?.map((project) => (
              <div
                key={project._id}
                className={styles.projectCard}
                onClick={() => toggleProjectInfoHandler(project._id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.boxTextProject}>
                  <div className={styles.triangleIcon}>
                    <p>Click for details</p>
                    <TriangleIcon />
                  </div>
                  <h3>{project.name.toUpperCase()}</h3>
                  <div className={styles.portableStyle}>
                    <PortableText value={project.content} />
                  </div>
                </div>
                <div className={styles.boxImageProject}>
                  <Image
                    className={styles.projectImage}
                    src={urlFor(project.image).width(500).height(500).fit('crop').url()}
                    alt={project.imageAlt || "Project image"}
                    width={500}
                    height={300}
                    priority
                  />
                </div>
                <div className={styles.visitRepoAndWebsiteButtons}>
                  <div className={styles.styledButtonGit}>
                    <Link href={project.githubUrl} aria-label="Go to GitHub repository" target="_blank" rel="noopener noreferrer">
                      GitHub
                      <Image src="/github.svg" alt="external link" width={28} height={28} />
                    </Link>
                  </div>
                  <div className={styles.styledButtonWebsite}>
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      Visit Website
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











