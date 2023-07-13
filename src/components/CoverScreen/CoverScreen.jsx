import Button from "../Button/Button";
import "./CoverScreen.css";

const CoverScreen = ({ score, onStartGame, duration }) => (
  <div className="intro">
    <h1 className="title">{score > -1 ? "Game over!" : "Pop-a-balloon! 🎈"}</h1>
    {score > -1 ? (
      <p className="description">
        {`You scored ${
          score === 0 ? "nothing" : `${score} ${score > 1 ? "hits" : "hit"}`
        }`}
      </p>
    ) : (
      <p className="description">
        A small &amp; simple {duration}-second balloon game built with React.
        Find the source here.
      </p>
    )}
    <div className="action">
      <Button onClick={onStartGame} width={"wide"}>
        {score > -1 ? "Play again" : "Start Game"}
      </Button>
    </div>
  </div>
);

export default CoverScreen;
