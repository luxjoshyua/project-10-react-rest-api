import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// extract context property from props
export default ({ context }) => {
  // call the signOut() action passed down through context
  // component calls signOut and updates state after render
  useEffect(() => context.actions.signOut());

  // redirect component that redirects user to root path
  return <Redirect to='/' />;
};
