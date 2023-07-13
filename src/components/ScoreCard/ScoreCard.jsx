const ScoreCard = ({ score, time }) => {
  return (
    <div className="game-score">
      {score} hits / {time}s remaining
    </div>
  );
};

export default ScoreCard;
