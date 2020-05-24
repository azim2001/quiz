import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const QuizResult = ({ retry }) => {
  const cls = useStyles();
  const { questions, results } = useSelector((state) => state.quiz);
  const successAnswersCount = Object.keys(results).reduce((acc, id) => (results[id] === 'success' ? acc + 1 : acc), 0);
  return (
    <div className="quiz-result">
      <ul>
        { questions.map((question, index) => {
          const answerState = results[question.id] === 'error' ? 'fa-times' : 'fa-check';
          const classes = ['fa', answerState, results[question.id]];
          return (
            <li key={question.id}>
              <strong>{index + 1}</strong>&nbsp;
              <span dangerouslySetInnerHTML={{ __html: question.question }}/>
              <i className={classes.join(' ')} />
            </li>
          );
        }) }
      </ul>
      <h3>Correctly answered {successAnswersCount} out of {questions.length} </h3>
      <Button
        variant="contained"
        color="primary"
        onClick={retry}
        className={cls.button}
        endIcon={<Icon className="fas fa-sync-alt"></Icon>}
      >
        Retry
      </Button>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          endIcon={<Icon className="fas fa-angle-double-right"/>}
          className={cls.button}
        >
          Select another
        </Button>
      </Link>
    </div>
  );
};

export default QuizResult;
