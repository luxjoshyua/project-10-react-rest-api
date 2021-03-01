import React, { Component } from "react";
import "./App.css";
// import Data from "./Data";
import api from "./config";

class App extends Component {
  // make GET request to /courses route
  // fetch the data then log it out
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
        console.log("what is data", data);
      });
  }

  render() {
    return (
      // JSX to render goes here
      <div className="course-wrapper">
        <h1 className="course-heading">Course Titles</h1>
        <ul></ul>
      </div>
    );
  }
}

export default App;
