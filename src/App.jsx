import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import QuizSelect from './components/QuizSelect';
import Quiz from './components/Quiz';

function App() {
  return (
      <Layout>
        <Switch>
          <Route path='/quiz' component={Quiz} />
          <Route path='/' component={QuizSelect} exact />
          {/* настроить редирект */}
          <Redirect to={'/'} exact />
        </Switch>
      </Layout>
  );
}

export default (App);
