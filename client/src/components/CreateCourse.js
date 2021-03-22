/**
 * Create Course Component
 *  - /courses/create route
 *  - renders a form allowing user to create new course
 *  - renders "Create Course" button that sends POST request to /api/courses route
 *  - renders "Cancel" button that returns user to default route (i.e. list of courses)
 */
import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  // save all neccessary inputs to state
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  };

  render() {
    const { context } = this.props;
    // access all necessary inputs saved to state
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
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText='Create Course'
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
    const { title, description, estimatedTime, materialsNeeded } = this.state; // saves all entered data
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    // access the createCourse API call in Data.js
    context.data
      .createCourse(course, authUserEmail, authUserPassword)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
          return {
            errors: [`Course was not successfully created in the database`],
          };
        } else {
          this.props.history.push('/');
          console.log(
            `Course ${title} has been successfully created by ${authUser.firstName} ${authUser.lastName}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/error');
      });
  };

  cancel = () => {
    // redirect to previous screen
    this.props.history.push(this.props.history.go(-1));
  };
}
