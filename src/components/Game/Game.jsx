import React, { useState, useRef, useEffect } from "react";
import GameGrid from "../BalloonGrid/BalloonGrid";
import CoverScreen from "../CoverScreen/CoverScreen";
import ScoreCard from "../ScoreCard/ScoreCard";
import { CSSTransition } from "react-transition-group";
import Constants from "../../utils/constants";
import Toast from "../Toast/Toast";
import Button from "../Button/Button";
import "./Game.css";

const Game = ({ numberOfBalloons, gameDuration }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeBalloons, setActiveBalloons] = useState([]);
  const [score, setScore] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [gameStopped, setGameStopped] = useState(false);
  const [hit, setHit] = useState(false);

  const timerRef = useRef(null);

  const handleBalloonClick = (id) => {
    setScore((prevScore) => prevScore + 1);
    setHit(true);
    setActiveBalloons((prevActiveBalloons) =>
      prevActiveBalloons.filter((activeId) => activeId !== id)
    );

    setTimeout(() => {
      setHit(false);
    }, Constants.randomnessLimits.lower);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setActiveBalloons([]);
    setTimeRemaining(gameDuration);
    setGameStopped(false);
  };

  const stopGame = () => {
    setGameStarted(false);
    setGameStopped(true);
  };

  useEffect(() => {
    if (gameStarted && !gameStopped) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => {
          if (prevTimeRemaining > 0) {
            return prevTimeRemaining - 1;
          } else {
            clearInterval(timerRef.current);
            setGameStarted(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [gameStarted, gameStopped]);

  return (
    <div className="game-container">
      {(!gameStarted || gameStopped) && (
        <CoverScreen
          score={score}
          onStartGame={startGame}
          duration={Constants.gameDuration}
        />
      )}
      <CSSTransition
        in={gameStarted}
        timeout={250}
        classNames="balloons-screen"
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div className={`balloons-screen balloons-screen--${state}`}>
            <div className="game-nav">
              <h1 className="game-title">Pop-a-balloon!</h1>
              <div className="game-settings">
                <ScoreCard score={score} time={timeRemaining} />
                <Button type={"alert"} onClick={stopGame}>
                  Stop
                </Button>
              </div>
            </div>
            <GameGrid
              numberOfBalloons={numberOfBalloons}
              activeBalloons={activeBalloons}
              onBalloonClick={handleBalloonClick}
            />
          </div>
        )}
      </CSSTransition>
      <Toast message={"+1 hits"} trigger={hit} />
    </div>
  );
};

export default Game;
