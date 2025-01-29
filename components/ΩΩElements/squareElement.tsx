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

  const defaultColors = ["red", "blue", "green", "purple"];

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
        ></span>
      ))}
      <h1 className={styles.projectTitle}>{title}</h1>
    </div>
  );
};

export default SquareElement;


