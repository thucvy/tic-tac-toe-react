import "./Square.css";

export default function Square({ player, onClick, squareDisabled }) {
  return (
    <div
      className="square"
      onClick={onClick}
      style={{
        backgroundColor: (player || squareDisabled) && "rgb(204, 127, 127)",
      }}
    >
      {player}
    </div>
  );
}
