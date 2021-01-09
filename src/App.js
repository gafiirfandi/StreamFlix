import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import RowMovies from "./components/RowMovies";
import DetailMovie from "./components/DetailMovie";
import requests from "./requests";

function App() {
  return (
    <div className="App container-fluid">
      <Router>
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              Object.keys(requests).map((key) => {
                return (
                  <RowMovies key={key} title={key} fetchURL={requests[key]} />
                );
              })
            }
          />
          <Route
            path="/:movie_id-:slug"
            exact
            render={(props) => <DetailMovie {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
