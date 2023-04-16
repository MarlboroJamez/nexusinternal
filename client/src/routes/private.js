import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const ClientRoute = ({ component: Component, ...rest }) => {
  const { accounts, inProgress } = useMsal();

  if (inProgress === 'login') {
    return <div>Redirecting to login...</div>;
  }

  const isAuthenticated = !!accounts[0];

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ClientRoute;
