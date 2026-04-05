

import Image from "next/image";
import styles from './page.module.scss'; 
import ProjectHome from "@/components/Project_Home/ProjectHome";


export default function Home() {
  return (
    <main className={styles.main}> 
    <ProjectHome/>
    </main>
  );
}


