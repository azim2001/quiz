import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import ActiveQuiz from './ActiveQuiz';
import QuizResult from './QuizResult';
import { retryQuiz } from '../actions';


const Quiz = () => {
  const dispatch = useDispatch();
  useEffect(() => () => dispatch(retryQuiz()), [dispatch]);
  const quiz = useSelector((state) => state.quiz.questions);
  const { activeQuestion, loading, isFinished } = useSelector((state) => state.quizUI);
  return (
    <div className={isFinished ? 'quiz finished' : 'quiz'}>
      <div className="quiz-wrapper">
        <h1>{isFinished ? 'Results' : 'Answer on Questions'} </h1>
        {loading
          ? <>
            <LinearProgress style={{ margin: '50px 0px 20px' }} />
            <LinearProgress color="secondary" />
            </>
          : isFinished
            ? <QuizResult retry={() => dispatch(retryQuiz())} />
            : <ActiveQuiz
                question={quiz[activeQuestion].question}
                questionNumber={activeQuestion + 1}
                quizLength={quiz.length}
                answers={quiz[activeQuestion].answers}
              />
        }
      </div>
    </div>
  );
};

export default Quiz;
