import { createAction } from 'redux-actions';
import axios from 'axios';

const host = 'https://opentdb.com/api.php';

export const getQuizRequest = createAction('QUIZ_GET_REQUEST');
export const getQuizSuccess = createAction('QUIZ_GET_SUCCESS');
export const getQuizFailure = createAction('QUIZ_GET_FAILURE');

export const getQuiz = (quiz) => async (dispatch) => {
  dispatch(getQuizRequest());

  const amount = quiz.number >= 1 ? quiz.number : 1;
  const category = quiz.category !== 'any' ? quiz.category : '';
  const type = quiz.type !== 'any' ? quiz.type : '';
  const difficulty = quiz.difficulty !== 'any' ? quiz.difficulty : '';
  try {
    const response = await axios.get(host, {
      params: {
        amount,
        category,
        type,
        difficulty,
      },
    });
    dispatch(getQuizSuccess({ questions: response.data.results }));
  } catch (e) {
    console.log(e);
    dispatch(getQuizFailure());
  }
};

export const setAnswerState = createAction('ANSWER_SET_STATE');

export const finishQuiz = createAction('QUIZ_FINISH');

export const switchQuestion = createAction('QUESTION_SWITCH');

const continueQuiz = (questions, activeQuestion, dispatch) => {
  const isQuizFinished = activeQuestion + 1 === questions.length;
  const timeout = setTimeout(() => {
    isQuizFinished
      ? dispatch(finishQuiz())
      : dispatch(switchQuestion({ number: activeQuestion + 1 }));
    clearTimeout(timeout);
  }, 1000);
};

export const onAnswerClick = (clickedAnswer) => (dispatch, getState) => {
  const { questions, results } = getState().quiz;
  const { activeQuestion } = getState().quizUI;

  const question = questions[activeQuestion];

  if (clickedAnswer === question.correct_answer) {
    if (!results[question.id]) results[question.id] = 'success';

    dispatch(setAnswerState({ results, answerState: { [clickedAnswer]: 'success' } }));
    continueQuiz(questions, activeQuestion, dispatch);
  } else {
    results[question.id] = 'error';
    dispatch(setAnswerState({ results, answerState: { [clickedAnswer]: 'error' } }));
    continueQuiz(questions, activeQuestion, dispatch);
  }
};

export const retryQuiz = createAction('QUIZ_RETRY');
