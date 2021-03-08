import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Course Detail Component
 *  - /courses/:id route
 *  - retrieves detail for a course from REST API /api/courses/:id route
 *  - renders course
 *  - renders "Delete Course" button that sends DELETE request to /api/courses/:id route
 *  - renders "Update Course" button to navigate to "Update Course" screen
 */

export default class CourseDetail extends Component {
  state = {
    // populate array with fetched data
    course: [],
    user: [],
    errors: [],
  };

  // component first mounts (or on reload), make axios call to API to retrieve the individual course in the database
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/${this.props.match.url}`)
      .then((data) => {
        // console.log('data looks like = ', data);
        this.setState({
          course: data.data,
          user: data.data.User,
        });
        // console.log(this.state.course);
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        // push onto error stack
        this.props.history.push('/error');
      });
  }

  // componentDidUpdate(loadedProps) {
  //   if (loadedProps.location.pathname !== this.props.location.pathname) {
  //     axios
  //       .get(`http://localhost:5000/api/${this.props.match.url}`)
  //       .then((data) => {
  //         this.setState({
  //           course: data.data,
  //           user: data.data.User,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }

  render() {
    const result = this.state.course;
    // console.log('here are my results = ', result);
    // console.log('here is my user = ', result.User);

    // when user clicks "Delete Course" button,
    // need to send a DELETE request to the REST API's /api/courses/:id route
    // in order to delete a course.
    const deleteCourse = (e) => {
      e.preventDefault();
      console.log('func called!');
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ',
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      };
      fetch(`http://localhost:5000/api${this.props.match.url}`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          // do what you want with the response here
          console.log('what is my result? = ', result);
        });
    };

    return (
      <div>
        <div className='actions--bar'>
          <div className='bounds'>
            <div className='grid-100'>
              <span>
                <Link className='button' to={`/courses/${result.id}/update`}>
                  Update Course
                </Link>
                {/* sends a delete request to /api/courses/:id route */}
                <Link className='button' onClick={deleteCourse} to={`/`}>
                  Delete Course
                </Link>
              </span>
              <Link className='button button-secondary' to={`/`}>
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className='bounds course--detail'>
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course--label'>Course</h4>
              <h3 className='course--title'>{result.title}</h3>
              <p>current user logged in goes here</p>
            </div>
            <div className='course--description'>
              <ReactMarkdown children={result.description} />
            </div>
          </div>
          <div className='grid-25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <li className='course--stats--list--item'>
                  <h4>Estimated Time</h4>
                  <h3>{result.estimatedTime}</h3>
                </li>
                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>
                  <ReactMarkdown children={result.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
