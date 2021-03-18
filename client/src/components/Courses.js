import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Courses Component
 *  - / home route
 *  - retrieves the list of courses from the REST API /api/courses route
 *  - renders list of courses
 *  - each course needs to link to its respective "Course Detail" screen
 *  - component renders a link to the "Create Course" screen
 */
export default class Courses extends Component {
  state = {
    // populate array with fetched data
    courses: [],
  };

  // component first mounts (or on reload), make axios call to API to retrieve the list of courses in the database
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/courses`)
      .then((data) => {
        // console.log("What does data look like", data);
        this.setState({
          courses: data.data,
          user: data.data.User,
        });
        // console.log(this.state.courses);
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        // push onto error stack
        this.props.history.push('/error');
      });
  }

  componentDidUpdate(loadedProps) {
    if (loadedProps.location.pathname !== this.props.location.pathname) {
      axios
        .get(`http://localhost:5000/api/courses`)
        .then((data) => {
          this.setState({
            courses: data.data,
            user: data.data.User,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // then populate the DOM with the fetched data
  render() {
    const results = this.state.courses;
    console.log('here are my current courses in state = ', results);

    let courses = results.map((course) => (
      <React.Fragment key={course.id}>
        <div className='grid-33'>
          <Link
            className='course--module course--link'
            to={`/courses/${course.id}`}
          >
            <h4 className='course--label'>Course</h4>
            <h3 className='course--title'>{course.title}</h3>
          </Link>
        </div>
      </React.Fragment>
    ));

    return (
      <div className='bounds'>
        {courses}
        <div className='grid-33'>
          <Link
            className='course--module course--add--module'
            to='/courses/create'
          >
            <h3 className='course--add--title'>
              <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                viewBox='0 0 13 13'
                className='add'
              >
                <polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}
