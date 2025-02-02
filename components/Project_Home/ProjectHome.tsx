import React, { useEffect, useState, useCallback } from 'react';
import { getProjects } from '@/sanity/sanity.query';
import { Project } from '@/types/projects';
import HeaderSection from './HeaderSection';
import ProjectList from './ProjectList';
import ProjectFilter from './ProjectFilter';
import styles from "./ProjectHome.module.scss"; 
import Contact from '../Contact/Contact';
import Navbar from '../_NavBar/Navbar';
import SquareElement from '../ΩΩElements/squareElement'; 

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleProjectInfo = useCallback((projectId: string | null) => {
    setOpenProjectId(projectId === openProjectId ? null : projectId);
  }, [openProjectId]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData: Project[] = await getProjects();
      setProjects(projectsData);
      setFilteredProjects(projectsData);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  

  return (
    <section className={styles.homesection}>
      <Navbar />
      <HeaderSection />
      <SquareElement
        title="Projects"
        positions={[{ top: "35%", left: "6%" }]}
        colors={["#a4a9cf"]}
      />
      <ProjectFilter
        projects={projects}
        setFilteredProjects={setFilteredProjects}
        setOpenProjectId={setOpenProjectId}
      />
      <ProjectList
        projects={filteredProjects}
        openProjectId={openProjectId}
        toggleProjectInfo={toggleProjectInfo}
      />
      <Contact />
    </section>
  );
}

