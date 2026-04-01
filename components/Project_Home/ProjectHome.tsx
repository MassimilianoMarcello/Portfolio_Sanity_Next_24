// components/Project_Home/ProjectHome.tsx
// Server Component — fetch happens at build/request time, not client-side
import { getProjects } from '@/sanity/sanity.query';
import { Project } from '@/types/projects';
import HeaderSection from './HeaderSection';
import ProjectListClient from './ProjectListClient';
import styles from './ProjectHome.module.scss';
import Contact from '../Contact/Contact';
import Navbar from '../NavBar/Navbar';

export default async function Home() {
  const projects: Project[] = await getProjects();

  return (
    <section className={styles.homesection}>
      <Navbar />
      <HeaderSection />
       <div className={styles.sectionDivider}>
    <span>Case studies</span>
  </div>
      <ProjectListClient projects={projects} />
      <Contact />
    </section>
  );
}
