import { useState, useEffect } from "react";

import "./App.css";

import FetchData from "./FetchData";

import clearSkyImage from "./Images/clearsky.png";
import snowyImage from "./Images/snow.png";
import cloudImage from "./Images/cloud.png";
import thunderStorm from "./Images/thunderstorm.png";
import mistImage from "./Images/mist.png";
import rainyImage from "./Images/rain.png";
import calcTime from "./calcTime";
import convertime from "./convertime";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./Homepage";
import chart from "./chart";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/chart/:location" component={chart} />
      </Switch>
    </Router>
  );
}

export default App;
