import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/**
 * UserSignIn component
 *  - /signin route
 *  - renders form to sign in user using their existing account information
 *  - renders sign in button to sign in the user
 *  - renders cancel button that returns user to the default route (i.e. list of courses)
 */
export default class UserSignIn extends Component {
  // use emailAddress and password to sign in so initialise them in state
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  };

  render() {
    // console.log('here is my user sign in state = ', state);
    const { emailAddress, password, errors } = this.state;
    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Sign In'
            elements={() => (
              <React.Fragment>
                <input
                  id='emailAddress'
                  name='emailAddress'
                  type='text'
                  value={emailAddress}
                  onChange={this.change}
                  placeholder='Email Address'
                  autoComplete='Email Address'
                />
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.change}
                  placeholder='Password'
                  autoComplete='password'
                />
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account? <Link to={'/signup'}>Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: '/authenticated' },
    };

    // unpack the two requisite properties from the state object (this.state) into distinct variables
    const { emailAddress, password } = this.state;
    // access the sign in function
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        // user isn't found
        if (user === null) {
          this.setState(() => {
            return {
              errors: [
                'Sign-in was unsuccessful because user is not found, please signup',
              ],
            };
          });
        } else {
          // on successfuly sign, need to redirect to '/home'
          this.props.history.push('/authenticated');
          // from contains info about the pathname an unauthenticated user redirected from (via this.props.location.state)
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      // catch signin errors
      // parameter error is the rejection reason
      .catch((error) => {
        console.log(`Reason for not being able to sign in = ${error}`);
        // this.props.history.push('/error');
        this.setState(() => {
          return {
            errors: [
              'Sign-in was unsuccessful, please complete fields and try again.',
            ],
          };
        });
      });
  };

  cancel = () => {
    // redirect to home screen
    this.props.history.push('/');
  };
}
