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

  deleteCourse = () => {
    // context is the authenticated user
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const authUserEmail = authUser.emailAddress;
    const authUserPassword = authUser.password;
    const id = this.props.match.params.id;
    const { title } = this.state;

    context.data
      .deleteCourse(id, authUserEmail, authUserPassword)
      .then((errors) => {
        if (errors) {
          this.setState({ errors });
          return {
            errors: [`Course ${title} was not deleted from the database.`],
          };
        } else {
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/error');
      });
  };

  // component first mounts (or on reload), make axios call to API to retrieve the individual course in the database
  // useful: https://www.robinwieruch.de/react-fetching-data
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api${this.props.match.url}`)
      .then((data) => {
        this.setState({ course: data.data, user: data.data.User });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        // push onto error stack
        this.props.history.push('/error');
      });
  }

  render() {
    const { context } = this.props;
    const result = this.state.course;
    const authUser = context.authenticatedUser;
    const { user } = this.state;

    return (
      <div>
        <div className='actions--bar'>
          <div className='bounds'>
            {authUser && authUser.emailAddress === user.emailAddress ? (
              <React.Fragment>
                <div className='grid-100'>
                  <span>
                    <Link
                      className='button'
                      to={`/courses/${result.id}/update`}
                    >
                      Update Course
                    </Link>
                    <Link
                      className='button'
                      to='/courses'
                      onClick={this.deleteCourse}
                    >
                      Delete Course
                    </Link>
                  </span>
                  <Link className='button button-secondary' to='/courses'>
                    Return to List
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className='button button-secondary' to='/'>
                  Return to List
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className='bounds course--detail'>
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course--label'>Course</h4>
              <h3 className='course--title'>{result.title}</h3>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className='course--description'>
              <ReactMarkdown children={result.description} />
            </div>
          </div>
          <div className='grid-25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <h4>Estimated Time</h4>
                <li className='course--stats--list--item'>
                  <ReactMarkdown children={result.estimatedTime} />
                </li>
                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown children={result.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
