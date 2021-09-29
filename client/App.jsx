import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import AppsPage from './components/AppsPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/apps'>
          <AuthPage buttonLabel='Sign In' url='signin' />
        </Route>
        <Route path='/signup'>
          <AuthPage buttonLabel='Sign Up' url='signup' />
        </Route>
        <Route path='/'>
          <AppsPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
