import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/**
 * UserSignUp component
 *  - /signup route
 *  - renders form to sign up a user
 *  - renders sign up button that sends POST request to the REST API's /api/users route and signs in user
 *  - renders a cancel button that returns user to the default route (i.e. list of courses)
 */
export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    password: '',
    emailAddress: '',
    password: '',
    errors: [],
  };

  render() {
    const { firstName, lastName, emailAddress, password, errors } = this.state;

    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Sign Up'
            elements={() => (
              <React.Fragment>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  value={firstName}
                  onChange={this.change}
                  placeholder='First Name'
                />
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  value={lastName}
                  onChange={this.change}
                  placeholder='Last Name'
                />
                <input
                  id='emailAddress'
                  name='emailAddress'
                  type='text'
                  value={emailAddress}
                  onChange={this.change}
                  placeholder='Email Address'
                  autoComplete='username'
                />
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.change}
                  placeholder='Password'
                  autoComplete='current-password'
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to='/signin'>Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }

  // change method changes the state of the name with each input
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // submit function calls the createUser function so the user can be created in the api
  submit = () => {
    const { context } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;

    // create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push('/');
          });
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
