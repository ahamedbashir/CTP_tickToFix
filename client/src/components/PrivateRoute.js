import React from 'react';
import{ Redirect, Route } from 'react-router-dom';
import auth from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    sessionStorage.isAuthenticated === 'true'
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

export default PrivateRoute;