import React from "react";
import Tag from "@/components/ui/Tag";
import styles from "./TechnologiesUsed.module.scss";

interface Technology {
  _id: string;
  name: string;
  slug?: string;
}

interface TechnologiesUsedProps {
  technologies?: Technology[];
}

const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({ technologies }) => {
  if (!technologies?.length) return null;

  return (
    <ul className={styles.list} aria-label="Technologies used">
      {technologies.map((tech) => (
        <li key={tech._id}>
          <Tag>{tech.name}</Tag>
        </li>
      ))}
    </ul>
  );
};

export default TechnologiesUsed;
