import React from 'react';

const Question = ({ question, options, selected, setAnswer, onSubmit }) => (
  <div className="question">
    <h2>{question}</h2>
    <table>
      <tbody>
        {options.map((option, index) => (
          <tr
            key={index}
            onClick={() => setAnswer(option)}
            className={selected === option ? 'selected' : ''}
          >
            <td>{option}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={onSubmit} disabled={selected === null}>
      Next
    </button>
  </div>
);

export default Question;
