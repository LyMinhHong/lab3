import React from 'react'

function Score(props) {
  const { score, onRestart } = props
  return (
    <div className="result">
      <h2>Quiz End</h2>
      <h3>Your Score: {score}</h3>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  )
}

export default Score
