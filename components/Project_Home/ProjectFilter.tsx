import React, { useState, useMemo, useEffect, useCallback } from "react";
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
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const toggleTechnology = useCallback((tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }, []);

  const clearSelection = () => setSelectedTechnologies([]);

  const uniqueTechnologies = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technologies?.map((t) => t.name) || []))),
    [projects]
  );

  useEffect(() => {
    const filtered = selectedTechnologies.length
      ? projects.filter((p) => selectedTechnologies.every((tech) => p.technologies?.some((t) => t.name === tech)))
      : projects;

    setFilteredProjects(filtered);
    setOpenProjectId(null);
  }, [selectedTechnologies, projects, setFilteredProjects, setOpenProjectId]);

  return (
    <div className={styles.filterContainer}>
      <section className={styles.filter}>
        {uniqueTechnologies.map((tech) => (
          <button
            key={tech}
            onClick={() => toggleTechnology(tech)}
            className={`${styles.theButton} ${selectedTechnologies.includes(tech) ? styles.active : ""}`}
          >
            {tech}
          </button>
        ))}
        <span className={styles.clearButtonContainer}>
          <button className={styles.clearButton} onClick={clearSelection}>Clear</button>
        </span>
      </section>
      {selectedTechnologies.length > 0 && !projects.some((p) =>
        selectedTechnologies.every((tech) => p.technologies?.some((t) => t.name === tech))
      ) && (
        <NoProjectsMessage selectedTechnologies={selectedTechnologies} handleClearSelection={clearSelection} />
      )}
    </div>
  );
};

export default React.memo(ProjectFilter);



