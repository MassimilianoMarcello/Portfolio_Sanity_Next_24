import React, { useEffect, useState, useCallback } from 'react';
import { getProjects } from '@/sanity/sanity.query';
import { Project } from '@/types/projects';
import HeaderSection from './HeaderSection';
import ProjectList from './ProjectList';
import styles from './ProjectHome.module.scss';
import Contact from '../Contact/Contact';
import Navbar from '../_NavBar/Navbar';
import SquareElement from '../ui/squareElement';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleProjectInfo = useCallback(
    (projectId: string | null) => {
      setOpenProjectId((prev) => (prev === projectId ? null : projectId));
    },
    []
  );

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData: Project[] = await getProjects();
      setProjects(projectsData);
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
        positions={[{ top: '35%', left: '6%' }]}
        colors={['#a4a9cf']}
      />
      {loading ? (
        <div className={styles.loading}>
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
        </div>
      ) : (
        <ProjectList
          projects={projects}
          openProjectId={openProjectId}
          toggleProjectInfo={toggleProjectInfo}
        />
      )}
      <Contact />
    </section>
  );
}

