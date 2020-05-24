import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { shuffle, uniqueId } from 'lodash';
import * as actions from '../actions';

const quiz = handleActions({
  [actions.getQuizSuccess](state, { payload: { questions } }) {
    return {
      ...state,
      questions: questions.map((question) => ({
        ...question,
        id: uniqueId(),
        answers: shuffle([...question.incorrect_answers, question.correct_answer]),
      })),
    };
  },
  [actions.setAnswerState](state, { payload: { results } }) {
    return { ...state, results };
  },
  [actions.retryQuiz](state) {
    return { ...state, results: {} };
  },
}, {
  results: {},
  questions: [
    {
      answers: [],
      question: '',
    }],
});

const quizUI = handleActions({
  [actions.getQuizRequest](state) {
    return { ...state, loading: true };
  },
  [actions.getQuizSuccess](state) {
    return { ...state, loading: false };
  },
  [actions.getQuizFailure](state) {
    return { ...state, loading: false };
  },
  [actions.switchQuestion](state, { payload: { number } }) {
    return { ...state, activeQuestion: number, answerState: null };
  },
  [actions.setAnswerState](state, { payload: { answerState } }) {
    return { ...state, answerState };
  },
  [actions.finishQuiz](state) {
    return { ...state, isFinished: true };
  },
  [actions.retryQuiz]() {
    return {
      activeQuestion: 0,
      isFinished: false,
      loading: false,
      error: null,
      answerState: null,
    };
  },
}, {
  activeQuestion: 0,
  isFinished: false,
  loading: false,
  error: null,
  answerState: null,
});

export default combineReducers({ quiz, quizUI });
