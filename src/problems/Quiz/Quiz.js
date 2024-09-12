import React, { useState } from "react";
import "./Quiz.css";

const data = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2,
    id: "q1",
  },

  {
    question: "Which language is primarily used for web development?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: 2,
    id: "q2",
  },

  {
    question: "Who wrote the novel '1984'?",
    options: [
      "George Orwell",
      "J.K. Rowling",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    answer: 0,
    id: "q3",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    answer: 0,
    id: "q4",
  },

  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    answer: 2,
    id: "q5",
  },
];

const Quiz = () => {
  const [score, setScore] = useState(0);

  function checkAnswer(qIndex, optionIndex) {
    if (data[qIndex].answer === optionIndex) {
      setScore((prev) => prev + 1);
    }
  }
  return (
    <div>
      <h1>QUIZ</h1>
      {data.map((q, i) => (
        <Question
          question={q}
          key={q.id}
          qIndex={i}
          checkAnswer={checkAnswer}
        />
      ))}
      <h2 className="score">Score : {score}</h2>
    </div>
  );
};

const Question = ({ question, qIndex, checkAnswer }) => {
  const [answered, setAnswerd] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  function handleClick(i) {
    if (answered) return;
    console.log("answered");
    setAnswerd(true);
    setClickedIndex(i);
    checkAnswer(qIndex, i);
  }
  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        {question.options.map((op, i) => {
          return (
            <p
              key={i}
              className={`option ${
                data[qIndex].answer === i && answered ? "correct" : ""
              } ${
                answered &&
                clickedIndex === i &&
                clickedIndex !== data[qIndex].answer
                  ? "wrong"
                  : ""
              }`}
              onClick={() => handleClick(i)}
            >
              <span>{i + 1} </span>
              <span>{op}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default Quiz;
