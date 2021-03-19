import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context';

// destructures and renames the component prop + collects any props passed to it in a ...rest variable
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            // check whether authenticatedUser in state
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  // object contains information about the path to redirect to (if not authenticated),
                  // and the route the user was trying to access before being redirected
                  pathname: '/signin',
                  // the state property value is the current location of the route the user tried to access
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
