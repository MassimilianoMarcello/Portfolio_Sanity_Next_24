import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./NoProject.module.scss";

interface NoProjectsMessageProps {
  selectedTechnologies: string[];
  handleClearSelection: () => void;
}

const NoProjectsMessage: React.FC<NoProjectsMessageProps> = ({
  selectedTechnologies,
  handleClearSelection,
}) => {
  const technologiesList = selectedTechnologies.join(", ");

  useEffect(() => {
    document.body.classList.add("no-scroll"); // Blocca lo scrolling
    return () => {
      document.body.classList.remove("no-scroll"); // Ripristina lo scrolling
    };
  }, []);

  return (
    <div className={styles.MessageContainer}>
      <Image src="/logo.png" alt="mass dev logo" width={200} height={60} />
      <h1>Oops! No projects match your selection.</h1>
      {selectedTechnologies.length > 0 && (
        <p>
          You selected: <strong>{technologiesList}</strong>.
        </p>
      )}
      <button
        onClick={handleClearSelection}
        className={styles.clearSelectionButton}
      >
        Clear Selection
      </button>
    </div>
  );
};

export default NoProjectsMessage;



