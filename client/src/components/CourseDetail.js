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
  _isMounted = false;
  state = {
    isLoading: true,
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

    context.data
      .deleteCourse(id, authUserEmail, authUserPassword)
      .then((errors) => {
        if (errors) {
          this.setState({ errors });
          return {
            errors: [`Course was not deleted from the database.`],
          };
        } else {
          this.props.history.push('/');
          console.log('Course was successfully deleted from the database.');
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
    this._isMounted = true;
    axios
      .get(`http://localhost:5000/api${this.props.match.url}`)
      .then((data) => {
        if (this._isMounted) {
          this.setState({
            course: data.data,
            user: data.data.User,
          });
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        // push onto error stack
        this.props.history.push('/error');
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { context } = this.props;
    const result = this.state.course;
    const { user } = this.state;
    const authUser = context.authenticatedUser;

    return (
      <div>
        <div className='actions--bar'>
          <div className='bounds'>
            <div className='grid-100'>
              <span>
                {authUser && authUser.emailAddress === user.emailAddress ? (
                  <React.Fragment>
                    <Link
                      className='button'
                      to={`/courses/${result.id}/update`}
                    >
                      Update Course
                    </Link>
                    <Link
                      className='button'
                      onClick={this.deleteCourse}
                      to={`/`}
                    >
                      Delete Course
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment />
                )}
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
              <p>{user.firstName}</p>
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
