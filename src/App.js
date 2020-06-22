import React from 'react';
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/pokemon/:id" component={Pokemon}/>
          <Route exact path="/" component={Pokedex}/>
        </Switch>
    </Router>
  );
}

export default App;
