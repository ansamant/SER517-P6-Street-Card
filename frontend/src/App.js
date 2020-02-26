import React from 'react';
import './App.css';
import LandingPage from './LandingPage.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WrappedNormalLoginForm from './Login.js';
import WrappedGreeterForm from './GreeterView';
import WrappedLogTable from './LogView';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={WrappedNormalLoginForm} />
        <Route path="/greeter" exact component={WrappedGreeterForm}/>
        <Route path="/log" exact component={WrappedLogTable}/>
      </Switch>
    </Router>
    );
}


export default App;