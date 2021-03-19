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
          console.log('Course was successfully deleted from the database.');
          // force a rerender here of the courses screen somehow?
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
    const authUser = context.authenticatedUser;

    //declares markdown variables
    const estimatedTimeMarkdown = ` #### Estimated Time \n\n ### ${this.state.course.estimatedTime}`;
    const materialsNeededMarkdown = `* ${this.state.course.materialsNeeded}`;

    return (
      <div>
        <div className='actions--bar'>
          <div className='bounds'>
            {authUser && authUser.id === this.state.course.userId ? (
              <React.Fragment>
                <div className='grid-100'>
                  <span>
                    <Link
                      className='button'
                      to={`${this.props.match.url}/update`}
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
                <Link className='button button-secondary' to='/courses'>
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
              <h3 className='course--title' key={this.state.course.id}>
                {this.state.course.title}{' '}
              </h3>
              <p>
                {this.state.user.firstName} {this.state.user.lastName}
              </p>
            </div>
            <div className='course--description'>
              <p>{this.state.course.description}</p>
            </div>
          </div>
          <div className='grid-25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <li className='course--stats--list--item'>
                  <ReactMarkdown source={estimatedTimeMarkdown} />
                </li>
                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={materialsNeededMarkdown} />
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
