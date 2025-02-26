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
import RepoAndWebSiteButtons from "../ΩΩElements/RepoAndWebSiteButtons";

interface ProjectListProps {
  projects: Project[];
  openProjectId: string | null;
  toggleProjectInfo: (projectId: string | null) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, openProjectId, toggleProjectInfo }) => {
  const [isExiting, setIsExiting] = React.useState(false);

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

  // Raggruppiamo i progetti in base alla categoria (main, secondary, sandbox)
  const groupedProjects = useMemo(() => {
    return projects.reduce((acc, project) => {
      if (!acc[project.importance]) {
        acc[project.importance] = [];
      }
      acc[project.importance].push(project);
      return acc;
    }, {} as Record<string, Project[]>);
  }, [projects]);

  // Le categorie sono fisse: "main", "secondary", "sandbox"
  const categories = [
    { value: "main", label: "Projects that demonstrate core skills and expertise, serving as the strongest examples of professional capabilities." },
    { value: "secondary", label: "Projects that showcase additional skills and knowledge, complementing the main projects by highlighting versatility and depth." },
    { value: "sandbox", label: "Projects focused on exploring and experimenting with new technologies, providing a foundation for innovation in future work." },
  ];

  // Ordiniamo le categorie per assicurarsi che vengano visualizzate sempre nell'ordine giusto
  const sortedCategories = categories.filter(category => groupedProjects[category.value]);

  return (
    <div className={styles.projectListContainer}>
      {sortedCategories.map((category, index) => (
        <div
          key={category.value}
          id={category.value}
          className={`${styles.categorySection} ${styles.fadeIn}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >

          <div className={styles.categoryLabel}>
            {category.value.toUpperCase()}
            <p className={styles.categoryDescription}>{category.label}</p>
          </div>

          <div className={styles.projectCards}>
            {groupedProjects[category.value]?.map((project) => (
              
              <div
                key={project._id}
                className={styles.projectCard}
                onClick={() => toggleProjectInfoHandler(project._id)}
                onMouseLeave={handleMouseLeave}
              >
                  <h3 className={styles.titleMobile}>{project.name.toUpperCase()}</h3>
                <div className={styles.boxTextProject}>
               
                  <div className={styles.triangleIcon}>
                    <p className={styles.detailsText}>Click for details</p>
                    <TriangleIcon />
                  </div>
                  <h3 className={styles.titleDesktop}>{project.name.toUpperCase()}</h3>
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
                  <RepoAndWebSiteButtons
                    githubUrl={project.githubUrl}
                    url={project.url}
                    isAbsolute
                    bottom="0rem"
                    right="2rem"
                  />
                </div>
                <div className={styles.technologiesUsed}>
                  <TechnologiesUsed technologies={project.technologies} />
                </div>
                {openProjectId === project._id && (
                  <div
                    className={`${styles.infoBubble} ${isExiting ? styles.exit : ""}`}
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















