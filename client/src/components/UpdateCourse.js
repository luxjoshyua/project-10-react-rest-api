/**
 * Update Course Component
 *  - /courses/:id/update route
 *  - renders a form allowing user to update one of their courses
 *  - renders "Update Course" button that sends PUT request to /api/courses/:id route
 *  - renders "Cancel" button that returns user to default route (i.e. list of courses)
 */
import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
  // save all necessary inputs to state
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    course: [],
    users: [],
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const authUserEmail = authUser.emailAddress;
    const authUserPassword = authUser.password;
    const id = this.props.match.params.id;

    context.data
      .getCourse(id, authUserEmail, authUserPassword)
      .then((data) => {
        if (authUser.id !== data.userId) {
          this.props.history.push('/forbidden');
        } else {
          this.setState({
            title: data.title,
            description: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded,
            userId: data.userId,
            user: data.User,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/forbidden');
      });
  }

  render() {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const authUser = context.authenticatedUser;

    return (
      <div className='bounds course--detail'>
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText='Update Course'
          elements={() => (
            <React.Fragment>
              <div className='grid-66'>
                <div className='course--header'>
                  <h4 className='course--label'>Course</h4>
                  <div>
                    <input
                      id='title'
                      name='title'
                      type='text'
                      className='input-title course--title--input'
                      placeholder='Course title...'
                      value={title}
                      onChange={this.change}
                    />
                  </div>
                  <p>
                    By {authUser.firstName} {authUser.lastName}
                  </p>
                </div>
                <div className='course--description'>
                  <div>
                    <textarea
                      id='description'
                      name='description'
                      placeholder='Course description...'
                      value={description}
                      onChange={this.change}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='grid-25 grid-right'>
                <div className='course--stats'>
                  <ul className='course--stats--list'>
                    <li className='course--stats--list--item'>
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id='estimatedTime'
                          name='estimatedTime'
                          type='text'
                          className='course--time--input'
                          placeholder='Hours'
                          value={estimatedTime}
                          onChange={this.change}
                        />
                      </div>
                    </li>
                    <li className='course--stats--list--item'>
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id='materialsNeeded'
                          name='materialsNeeded'
                          placeholder='List materials...'
                          value={materialsNeeded}
                          onChange={this.change}
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  // when the user updates the input field, the respective [name] : value pair is updated
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // submit
  submit = () => {
    // context is my authenticatedUser
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const authUserEmail = authUser.emailAddress;
    const authUserPassword = authUser.password;
    const userId = authUser.id;
    const id = this.props.match.params.id;
    const { title, description, estimatedTime, materialsNeeded } = this.state; // saves all entered data
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };
    // access the updateCourse API call in Data.js
    context.data
      .updateCourse(id, course, authUserEmail, authUserPassword)
      .then((errors) => {
        if (errors) {
          this.setState({ errors });
          return {
            errors: [`Course ${course.title} was not updated in the database.`],
          };
        } else {
          this.setState({ course });
          this.props.history.push('/');
          console.log(
            `Course ${course.title} has been successfully updated by ${authUser.firstName} ${authUser.lastName}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/forbidden');
      });
  };

  cancel = () => {
    // redirect to previous screen
    this.props.history.push(this.props.history.go(-1));
  };
}
