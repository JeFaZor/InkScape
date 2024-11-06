import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './style.css';
import Home from './views/home';
import NotFound from './views/not-found';
import GetStarted from './components/get-started/get-started';  // Import the GetStarted component
import Navbar8 from './components/navbar8';  // Import the Navbar8 component


const App = () => {
  return (
    <Router>
            <Navbar8 />

      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={GetStarted} path="/get-started" />  // Add the route for GetStarted
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));