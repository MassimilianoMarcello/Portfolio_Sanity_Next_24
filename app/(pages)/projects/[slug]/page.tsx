// "use client";

// import { getProject } from "@/sanity/sanity.query";
// import { PortableText } from "@portabletext/react";
// import Link from "next/link";
// import styles from "./singleProject.module.scss";

// type Props = {
//   params: { slug: string };
// };

// export default async function Project({ params }: Props) {
//   // Recupera il progetto dalla funzione di query
//   const project = await getProject(params.slug);

//   // Verifica se il progetto è stato trovato
//   if (!project) {
//     return <div>Project not found.</div>;
//   }

//   return (
//     <div className={styles.projectContainer}>
//       <div className={styles.contentWrapper}>
//         <div className={styles.titleContainer}>
//           <h1 className={styles.howIMade}>How I Made</h1>
//           <h1 className={styles.titleProject}>{project.name}</h1>
//           <div className={styles.buttons}>
//             <div className={styles.styledButton}>
//               <Link href={project.githubUrl}>Github</Link>
//             </div>
//             <div className={styles.styledButton}>
//               <Link href={project.url}>Visit Website</Link>
//             </div>
//             <div className={styles.styledButton}>
//               <Link href={`/`}>Return</Link>
//             </div>
//           </div>
//         </div>
//         <div className={styles.projectDescription}>
//           {project.content ? (
//             <PortableText value={project.content} />
//           ) : (
//             <p>No content available for this project.</p>
//           )}
//         </div>
//       </div>

//       {project.challenges && project.challenges.length > 0 ? (
//         <div className={styles.challengesSection}>
//           <h4>Challenges Index:</h4>
//           <ul className={styles.challengesList}>
//             {project.challenges.map((challenge) => {
//               // Genera un ID unico basato sul titolo della challenge
//               const challengeId = `challenge-${challenge.title.replace(/\s+/g, '-').toLowerCase()}`;

//               return (
//                 <li key={challenge._id}>
//                   <a
//                     href={`#${challengeId}`}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       document.getElementById(challengeId)?.scrollIntoView({ behavior: 'smooth' });
//                     }}
//                   >
//                     {challenge.title}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>

//           {/* Mostra i dettagli delle sfide sotto l'indice */}
//            <div className={styles.challengeDetails}>
//             {project.challenges.map((challenge) => {
//               const challengeId = `challenge-${challenge.title.replace(/\s+/g, '-').toLowerCase()}`;

//               return (
//                 <div
//                   id={challengeId}
//                   key={challenge._id}
//                   className={styles.challengeItem}
//                 >
//                   <h5>{challenge.title}</h5>
//                   {challenge.description && <p>{challenge.description}</p>}
           
//                   {challenge.content && <PortableText value={challenge.content} />}
//                 </div>
//               );
//             })}
//           </div> 
//         </div>
//       ) : (
//         <p>No challenges faced for this project.</p>
//       )}
//     </div>
//   );
// }


import { getProject } from "@/sanity/sanity.query";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import styles from "./singleProject.module.scss";
import ChallengeLink from "./ChallangeLink";
import { portableTextComponents } from "./portableTextComponents"; // Importa i componenti PortableText personalizzati

type Props = {
  params: { slug: string };
};

export default async function Project({ params }: Props) {
  const project = await getProject(params.slug);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleContainer}>
          <h1 className={styles.howIMade}>How I Made</h1>
          <h1 className={styles.titleProject}>{project.name}</h1>
          <div className={styles.buttons}>
            <div className={styles.styledButton}>
              <Link href={project.githubUrl}>Github</Link>
            </div>
            <div className={styles.styledButton}>
              <Link href={project.url}>Visit Website</Link>
            </div>
            <div className={styles.styledButton}>
              <Link href={`/`}>Return</Link>
            </div>
          </div>
        </div>
        <div className={styles.projectDescription}>
          {project.content ? (
            <PortableText
              value={project.content}
              components={portableTextComponents} // Usa i componenti personalizzati
            />
          ) : (
            <p>No content available for this project.</p>
          )}
        </div>
      </div>

      {project.challenges && project.challenges.length > 0 ? (
        <div className={styles.challengesSection}>
          <h4>Challenges Index:</h4>
          <ul className={styles.challengesList}>
            {project.challenges.map((challenge) => {
              const challengeId = `challenge-${challenge.title.replace(/\s+/g, '-').toLowerCase()}`;

              return (
                <ChallengeLink
                  key={challenge._id}
                  challengeId={challengeId}
                  title={challenge.title}
                />
              );
            })}
          </ul>

          <div className={styles.challengeDetails}>
            {project.challenges.map((challenge) => {
              const challengeId = `challenge-${challenge.title.replace(/\s+/g, '-').toLowerCase()}`;
              return (
                <div
                  id={challengeId}
                  key={challenge._id}
                  className={styles.challengeItem}
                >
                  <h5>{challenge.title}</h5>
                  {challenge.description && <p>{challenge.description}</p>}
                  {challenge.content && (
                    <PortableText
                      value={challenge.content}
                      components={portableTextComponents} // Usa i componenti personalizzati
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No challenges faced for this project.</p>
      )}
    </div>
  );
}
