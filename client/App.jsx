import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './components/AuthPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <AuthPage buttonLabel='Sign In' url='signin' />
        </Route>
        <Route path='/signup'>
          <AuthPage buttonLabel='Sign Up' url='signup' />
        </Route>
        <Route path='/apps'>
          <h1>Apps</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
