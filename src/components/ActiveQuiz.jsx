import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { onAnswerClick } from '../actions';

const ActiveQuiz = ({
  question, questionNumber, quizLength, answers,
}) => {
  const dispatch = useDispatch();
  const answerState = useSelector((state) => state.quizUI.answerState);
  return (
    <div className="active-quiz">
      <small>{questionNumber} out of {quizLength}</small>
      <p className="question">
          <strong>{ questionNumber }.</strong>&nbsp;
          <span dangerouslySetInnerHTML={{ __html: question }}></span>
      </p>
      <ul>
        {answers.map((answer) => (
            <li
              key={answer}
              className={`answer-item ${answerState ? answerState[answer] : ''}`}
              onClick={() => dispatch(onAnswerClick(answer))}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
        ))}
      </ul>
    </div>
  );
};

ActiveQuiz.propTypes = {
  question: PropTypes.string,
  questionNumber: PropTypes.number,
  quizLength: PropTypes.number,
  answers: PropTypes.arrayOf(PropTypes.string),
};

export default ActiveQuiz;
