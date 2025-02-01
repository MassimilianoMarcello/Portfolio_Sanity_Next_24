import React, { useState, useEffect, useMemo, useCallback } from "react";
import NoProjectsMessage from "./NoProject";
import { Project } from "@/types/projects";
import styles from "./ProjectFilter.module.scss";

interface ProjectFilterProps {
  projects: Project[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setOpenProjectId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  projects = [],
  setFilteredProjects,
  setOpenProjectId,
}) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [localFilteredProjects, setLocalFilteredProjects] = useState<Project[]>(
    projects
  );

  const handleToggleTechnology = useCallback((technology: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(technology)
        ? prev.filter((tech) => tech !== technology)
        : [...prev, technology]
    );
  }, []);

  const handleClearSelection = () => {
    setSelectedTechnologies([]);
  };

  useEffect(() => {
    if (projects.length === 0) {
      setLocalFilteredProjects([]);
      return;
    }

    const filteredProjects =
      selectedTechnologies.length === 0
        ? projects
        : projects.filter((project) =>
            selectedTechnologies.every((tech) =>
              project.technologies?.some((t) => t.name === tech)
            )
          );

    setLocalFilteredProjects(filteredProjects);
    setFilteredProjects(filteredProjects); // Aggiorna lo stato esterno
    setOpenProjectId(null);
  }, [selectedTechnologies, projects, setFilteredProjects, setOpenProjectId]);

  const uniqueTechnologies = useMemo(
    () =>
      Array.from(
        new Set(
          projects.flatMap(
            (project) => project.technologies?.map((tech) => tech.name) || []
          )
        )
      ),
    [projects]
  );

  return (
    <div className={styles.filterContainer}>
      <section className={styles.filter}>
        {uniqueTechnologies.map((technology) => (
          <button
            key={technology}
            onClick={() => handleToggleTechnology(technology)}
            className={`${styles.theButton} ${
              selectedTechnologies.includes(technology) ? styles.active : ""
            }`}
          >
            {technology}
          </button>
        ))}
        <span className={styles.clearButtonContainer}>
          <button
            className={styles.clearButton}
            onClick={handleClearSelection}
          >
            Clear
          </button>
        </span>
      </section>
      {/* Controllo per mostrare NoProjectsMessage */}
      {localFilteredProjects.length === 0 && selectedTechnologies.length > 0 && (
        <NoProjectsMessage
          selectedTechnologies={selectedTechnologies}
          handleClearSelection={handleClearSelection}
        />
      )}
    </div>
  );
};

export default React.memo(ProjectFilter);




