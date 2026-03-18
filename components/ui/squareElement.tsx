import styles from "./squareElement.module.scss";

interface SquareProps {
  title: string;
  positions?: { top: string; left: string }[];
  colors?: string[];
}

const SquareElement: React.FC<SquareProps> = ({ title, positions, colors }) => {
  const defaultPositions = [
    { top: "10%", left: "10%" },
    { top: "10%", left: "80%" },
    { top: "80%", left: "10%" },
    { top: "80%", left: "80%" },
  ];

  const defaultColors = ["#9175ba", "#6a4da0", "#4f67d8", "#2d47c4"];

  return (
    <div className={styles.container}>
      {(positions || defaultPositions).map((pos, index) => (
        <span
          key={index}
          className={styles.square}
          style={{
            top: pos.top,
            left: pos.left,
            backgroundColor: colors ? colors[index] : defaultColors[index],
          }}
        />
      ))}
      <h1 className={styles.projectTitle}>{title}</h1>
    </div>
  );
};

export default SquareElement;


