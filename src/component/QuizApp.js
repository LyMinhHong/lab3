import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import Score from './Score';
import '../Quiz.css';

const QuizApp = () => {
  const [questions] = useState([
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      id: 2,
      question: 'What is the largest planet in our solar system?',
      options: ['Jupiter', 'Saturn', 'Mars', 'Earth'],
      answer: 'Jupiter',
    },
  ]);

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => pauseTimer();
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && !quizEnd) {
      handleSubmit();
    }
  }, [timeLeft, quizEnd]);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(60);
    startTimer();
  };

  const handleSelect = (answer) => {
    setSelected(answer);
  };

  const handleSubmit = () => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setTimeLeft(60); // Reset the timer for the next question
    } else {
      setQuizEnd(true);
      pauseTimer();
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setQuizEnd(false);
    setSelected(null);
    resetTimer();
  };

  const current = questions[currentQ];

  return (
    <div className="quiz-app">
      {quizEnd ? (
        <Score score={score} onRestart={handleRestart} />
      ) : (
        <>
          <div className="timer">Time Left: {timeLeft} seconds</div>
          <Question
            question={`Question ${currentQ + 1}: ${current.question}`}
            options={current.options}
            selected={selected}
            setAnswer={handleSelect}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default QuizApp;
