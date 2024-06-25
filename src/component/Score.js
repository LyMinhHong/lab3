import React from 'react';

const Score = ({ score, onRestart }) => (
  <div className="result">
    <h2>Quiz Completed!</h2>
    <h3>Your score: {score}</h3>
    <button onClick={onRestart}>Restart Quiz</button>
  </div>
);

export default Score;
