import React from 'react';
import './App.css';
import LandingPage from './LandingPage.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WrappedNormalLoginForm from './Login.js';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={WrappedNormalLoginForm} />
      </Switch>
    </Router>
    );
}


export default App;