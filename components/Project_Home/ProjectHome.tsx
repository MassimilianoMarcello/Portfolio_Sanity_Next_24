"use client";

import React, { useEffect, useState } from 'react';
import { getProjects } from '@/sanity/sanity.query';
import { Project } from '@/types/projects';
import HeaderSection from './HeaderSection';
import ProjectList from './ProjectList';
import ProjectFilter from './ProjectFilter';
import styles from "./ProjectHome.module.scss"; 
import Contact from '../Contact/Contact';

// Importa il file SASS


export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [openProjectId, setOpenProjectId] = useState<string | null>(null);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
    const toggleProjectInfo = (projectId: string) => {
      setOpenProjectId(projectId === openProjectId ? null : projectId);
    };
  
    useEffect(() => {
        const fetchProjects = async () => {
          const projectsData: Project[] = await getProjects();
          console.log("Fetched Projects:", projectsData); // Questo funziona
          setProjects(projectsData);
          setFilteredProjects(projectsData); // Assicurati di filtrare qui
        };
        fetchProjects();
      }, []);
  
    return (
      <section className={styles.homesection}>
        <HeaderSection
          // projects={projects}
          // setFilteredProjects={setFilteredProjects}
          // setOpenProjectId={setOpenProjectId}
        />
        <h1>Projects</h1>
        <ProjectFilter
          projects={projects}
          setFilteredProjects={setFilteredProjects}
          setOpenProjectId={setOpenProjectId}
        />
        <ProjectList
          projects={filteredProjects}
    
        
        />
        <Contact />
      </section>
    );
  }