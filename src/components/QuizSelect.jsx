import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  TextField, FormControl, InputLabel,
  MenuItem, Select, Button,
} from '@material-ui/core';
import { getQuiz } from '../actions';


const selectStyles = { color: '#fff', marginBottom: '25px' };

const QuizSelect = () => {
  const [quizParams, setQuizParams] = useState({
    category: 'any',
    type: 'any',
    difficulty: 'any',
    number: 10,
  });

  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(getQuiz(quizParams));
    setQuizParams({
      category: 'any',
      type: 'any',
      difficulty: 'any',
      number: 10,
    });
  };

  return (
    <div className="quiz-select">
      <form className="form" onSubmit={(e) => e.preventDefault()} >
        <div id="number">
          <TextField
            label="Number of questions"
            type="number"
            value={quizParams.number}
            onChange={(e) => setQuizParams({ ...quizParams, number: e.target.value })}
            inputProps={{ min: 1, max: 50 }}
            style={{ width: '300px' }}
          />
        </div>
        <FormControl>
          <InputLabel id="category">Choose quiz category</InputLabel>
          <Select
            labelId="category"
            value={quizParams.category}
            onChange={(e) => setQuizParams({ ...quizParams, category: e.target.value })}
            style={selectStyles}
          >
            <MenuItem value={'any'}>Any Category</MenuItem>
            <MenuItem value={9}>General Knowledge</MenuItem>
            <MenuItem value={10}>Entertainment: Books</MenuItem>
            <MenuItem value={11}>Entertainment: Film</MenuItem>
            <MenuItem value={12}>Entertainment: Music</MenuItem>
            <MenuItem value={13}>Entertainment: Musicals &amp; Theatres</MenuItem>
            <MenuItem value={14}>Entertainment: Television</MenuItem>
            <MenuItem value={15}>Entertainment: Video Games</MenuItem>
            <MenuItem value={16}>Entertainment: Board Games</MenuItem>
            <MenuItem value={17}>Science &amp; Nature</MenuItem>
            <MenuItem value={18}>Science: Computers</MenuItem>
            <MenuItem value={19}>Science: Mathematics</MenuItem>
            <MenuItem value={20}>Mythology</MenuItem>
            <MenuItem value={21}>Sports</MenuItem>
            <MenuItem value={22}>Geography</MenuItem>
            <MenuItem value={23}>History</MenuItem>
            <MenuItem value={24}>Politics</MenuItem>
            <MenuItem value={25}>Art</MenuItem>
            <MenuItem value={26}>Celebrities</MenuItem>
            <MenuItem value={27}>Animals</MenuItem>
            <MenuItem value={28}>Vehicles</MenuItem>
            <MenuItem value={29}>Entertainment: Comics</MenuItem>
            <MenuItem value={30}>Science: Gadgets</MenuItem>
            <MenuItem value={31}>Entertainment: Japanese Anime &amp; Manga</MenuItem>
            <MenuItem value={32}>Entertainment: Cartoon &amp; Animations</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="difficulty">Choose quiz difficulty</InputLabel>
          <Select
            labelId="difficulty"
            value={quizParams.difficulty}
            onChange={(e) => setQuizParams({ ...quizParams, difficulty: e.target.value })}
            style={selectStyles}
          >
            <MenuItem value={'any'}>Any Difficulty</MenuItem>
            <MenuItem value={'easy'}>Easy</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="type">Choose quiz difficulty</InputLabel>
          <Select
            labelId="type"
            value={quizParams.type}
            onChange={(e) => setQuizParams({ ...quizParams, type: e.target.value })}
            style={selectStyles}
          >
            <MenuItem value={'any'}>Any Type</MenuItem>
            <MenuItem value={'boolean'}>True/False</MenuItem>
            <MenuItem value={'multiple'}>Multiple Choice</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="button"
          variant="contained"
          id="start"
          onClick={submitHandler}
        >
          <Link to="/quiz" className="start">
            <i className="fas fa-play"/>&nbsp; Start
          </Link>
        </Button>
      </form>
    </div>
  );
};

export default QuizSelect;
