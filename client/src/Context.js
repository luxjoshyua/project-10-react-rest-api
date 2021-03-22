import React, { Component } from 'react';
import Cookies from 'js-cookie';

import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
  // initialise state
  // set the initial state of Provider class to the value stored in authenticatedUser cookie or null
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    // use destructuring assignment to extract authenticatedUser from this.state
    const { authenticatedUser } = this.state;

    // value object that provides the utility methods of the class Data
    const value = {
      // pass state to <Context.Provider> by adding authenticatedUser variable to the value object
      authenticatedUser,
      data: this.data,
      actions: {
        // reference to the signIn function
        signIn: this.signIn,
        // reference to the signOut function
        signOut: this.signOut,
      },
    };

    // console.log('what is authenticatedUser equal to', authenticatedUser);

    return (
      // value={value} represents an object containing the context to be shared throughout the component tree
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    console.log('here is logged in user = ', user);
    // save this password so we can access throughout the app - very important!
    user.password = password;
    // check if there is a user object
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      // set cookie
      // first argument specifies the name of the cookie to set
      // second argument specifies the value to store in the cookie: user is an object so need to convert to string
      // third argument is object to set additional cookie options e.g. cookie expires in 1 day
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  // Function to sign out a user
  signOut = () => {
    // update the authenticatedUser state to null on signOut
    this.setState({ authenticatedUser: null });
    // delete cookie created by Cookies.set() when user hits "sign out"
    Cookies.remove('authenticatedUser');
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
