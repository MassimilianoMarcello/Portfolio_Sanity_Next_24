import React from 'react';
import styles from './TechnologiesUsed.module.scss';

interface Technology {
  _id: string;
  name: string;
  slug: string; // Aggiungi altri campi se necessario
}

interface TechnologiesUsedProps {
  technologies: Technology[];
}

const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({ technologies }) => {
  return (
    <div>
   
      <ul className={styles.technologiesList}>
        {technologies.map((tech) => (
          <li key={tech._id}>{tech.name.toUpperCase()}</li> 
        ))}
      </ul>
    </div>
  );
};

export default TechnologiesUsed;


