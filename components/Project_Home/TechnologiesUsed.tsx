import React from "react";
import styles from "./TechnologiesUsed.module.scss";

interface Technology {
  _id: string;
  name: string;
  slug?: string;
}

interface TechnologiesUsedProps {
  technologies?: Technology[];
}

/** Stack come testo mono inline sotto il titolo (metadato, non elenco di bottoni). */
const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({ technologies }) => {
  if (!technologies?.length) return null;

  return (
    <ul className={styles.list} aria-label="Technologies used">
      {technologies.map((tech) => (
        <li key={tech._id}>{tech.name}</li>
      ))}
    </ul>
  );
};

export default TechnologiesUsed;
