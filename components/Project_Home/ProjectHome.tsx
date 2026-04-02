// components/Project_Home/ProjectHome.tsx
import { getProjects } from '@/sanity/sanity.query';
import { Project } from '@/types/projects';
import HeaderSection from './HeaderSection';
import ProjectList from './ProjectList';
import styles from './ProjectHome.module.scss';
import Contact from '../Contact/Contact';
import Navbar from '../NavBar/Navbar';

export default async function Home() {
  const projects: Project[] = await getProjects();

  return (
    <section className={styles.homesection}>
      <Navbar />
      <HeaderSection />
      <ProjectList projects={projects} />
      <Contact />
    </section>
  );
}
