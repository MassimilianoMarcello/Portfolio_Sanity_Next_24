import React, { useState, useMemo, useEffect } from "react";
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

  // Memoized list of unique technologies
  const uniqueTechnologies = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technologies?.map((t) => t.name) || []))),
    [projects]
  );

  // Filtered projects memoized
  const filteredProjects = useMemo(() => {
    if (!selectedTechnologies.length) return projects;
    return projects.filter((p) =>
      selectedTechnologies.every((tech) => p.technologies?.some((t) => t.name === tech))
    );
  }, [selectedTechnologies, projects]);

  // Update filtered projects on selection change
  useEffect(() => {
    setFilteredProjects(filteredProjects);
    setOpenProjectId(null);
  }, [filteredProjects, setFilteredProjects, setOpenProjectId]);

  // Check if no projects match the selected technologies
  const noProjectsMatch = selectedTechnologies.length > 0 && filteredProjects.length === 0;

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearSelection = () => setSelectedTechnologies([]);

  if (!projects.length) {
    return <div className={styles.filterContainer}>No projects available.</div>;
  }

  return (
    <div className={styles.filterContainer}>
      <section className={styles.filter} aria-label="Filter projects by technology">
        {uniqueTechnologies.map((tech) => (
          <button
            key={tech}
            onClick={() => toggleTechnology(tech)}
            className={`${styles.theButton} ${selectedTechnologies.includes(tech) ? styles.active : ""}`}
            aria-pressed={selectedTechnologies.includes(tech) ? "true" : "false"}
          >
            {tech}
          </button>
        ))}
        {selectedTechnologies.length > 0 && (
          <span className={styles.clearButtonContainer}>
            <button className={styles.clearButton} onClick={clearSelection} aria-label="Clear selection">
              Clear
            </button>
          </span>
        )}
      </section>
      {noProjectsMatch && (
        <NoProjectsMessage
          selectedTechnologies={selectedTechnologies}
          handleClearSelection={clearSelection}
        />
      )}
    </div>
  );
};

export default React.memo(ProjectFilter);



