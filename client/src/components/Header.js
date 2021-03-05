import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
 *  - displays on all routes
 *  - displays top menu bar for the application
 *  - includes buttons for signing in and signing up (if there's not an authenticated user)
 *  - includes user's name and a button for signing out (if there's an authenticated user)
 */

export default class Header extends React.PureComponent {
  render() {
    // extract context from this.props
    const { context } = this.props;
    // console.log(this.props);
    // store the authenticatedUser data in a variable
    const authUser = context.authenticatedUser;
    console.log('Auth user = ', authUser);

    // React.Fragment groups a list of children without adding extra nodes to the DOM
    // if there is an authenticated user stored in context, render a welcome message and a 'sign out' link
    // otherwise render 'sign in' and 'sign up' links
    return (
      <div className='header'>
        <div className='bounds'>
          <h1 className='header--logo'>Courses</h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.firstName}</span>
                <Link to='/signout'>Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className='signup' to='/signup'>
                  Sign Up
                </Link>
                <Link className='signin' to='/signin'>
                  Sign In
                </Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
}
