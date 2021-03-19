import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import PrivateRoute from './components/PrivateRoute';
import withContext from './Context';

// connect Header component to Context
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);

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

const App = () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <PrivateRoute
          path='/courses/:id/update'
          component={UpdateCourseWithContext}
        />
        <PrivateRoute
          path='/courses/create'
          component={CreateCourseWithContext}
        />
        <Route path='/courses/:id' component={CourseDetailWithContext} />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path='/signup' component={UserSignUpWithContext} />
        <Route path='/signout' component={UserSignOutWithContext} />
        <Route path='/courses' Redirect to='/' component={Courses} />
        <Route exact path='/' component={Courses} />
      </Switch>
    </div>
  </Router>
);

export default App;
