interface Square {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    size?: string;
  }
  
  interface SquareDecorationProps {
    squares: Square[];
  }
  
  const SquareDecoration: React.FC<SquareDecorationProps> = ({ squares = [] }) => {
    const colors = ['#9077b9', '#a4a9cf', '#cbe4f4' , '#9fbedc'];
  
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {squares.map((square, index) => {
          const size = square.size || '20px';
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                backgroundColor: colors[index % colors.length],
                top: square.top || 'auto',
                left: square.left || 'auto',
                right: square.right || 'auto',
                bottom: square.bottom || 'auto',
              }}
            />
          );
        })}
      </div>
    );
  };

  export default SquareDecoration
  