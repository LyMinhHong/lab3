import React, { Component } from 'react';
import Question from './Question';
import Score from './Score';

import '../Quiz.css';

export class QuizApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
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
      ],
      currentQ: 0,
      score: 0,
      quizEnd: false,
      selected: null,
      timer: null,
      timeLeft: 60, // time left in seconds
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.pauseTimer();
  }

  startTimer() {
    const { timer } = this.state;
    if (!timer) {
      const interval = setInterval(this.tick, 1000);
      this.setState({ timer: interval });
    }
  }

  pauseTimer() {
    const { timer } = this.state;
    clearInterval(timer);
    this.setState({ timer: null });
  }

  resetTimer() {
    const { timer } = this.state;
    clearInterval(timer);
    this.setState({ timer: null, timeLeft: 60 }); // Reset timeLeft to initial value
  }

  tick() {
    const { timeLeft, quizEnd } = this.state;
    if (!quizEnd) {
      if (timeLeft === 0) {
        this.pauseTimer();
        this.handleSubmit(); // Automatically submit when time runs out
      } else {
        this.setState({ timeLeft: timeLeft - 1 });
      }
    }
  }

  handleSelect(answer) {
    this.setState({ selected: answer });
  }

  handleSubmit() {
    const { currentQ, selected, score, questions } = this.state;

    if (selected === questions[currentQ].answer) {
      this.setState({ score: score + 1 });
    }

    if (currentQ < questions.length - 1) {
      this.setState((prevState) => ({
        currentQ: prevState.currentQ + 1,
        selected: null,
      }));
    } else {
      this.setState({ quizEnd: true });
      this.pauseTimer(); // Pause the timer when quiz ends
    }
  }

  handleRestart() {
    this.setState({
      currentQ: 0,
      score: 0,
      quizEnd: false,
      selected: null,
      timeLeft: 60, // Reset timeLeft to initial value
    });
    this.startTimer(); // Restart the timer
  }

  render() {
    const { currentQ, score, quizEnd, selected, questions, timeLeft } =
      this.state;
    const current = questions[currentQ];

    return (
      <div className="quiz-app">
        {quizEnd ? (
          <Score score={score} onRestart={this.handleRestart} />
        ) : (
          <>
            <div>Time Left: {timeLeft} seconds</div>
            <Question
              question={`Question ${currentQ + 1}: ${current.question}`}
              options={current.options}
              selected={selected}
              setAnswer={this.handleSelect}
              onSubmit={this.handleSubmit}
            />
          </>
        )}
      </div>
    );
  }
}

export default QuizApp;
