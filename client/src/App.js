import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import components
import Courses from "./components/Courses";

/**
 * App Component
 *  - main container component
 */
/* 
class App extends Component {
  tests connection between api and client:
  if connected successfully, will log out data
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    fetch("http://localhost:5000/api/courses")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
        console.log("here is data logging from api: ", data);
      });
  }
  
}
*/

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/courses" Redirect to="/" component={Courses} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
