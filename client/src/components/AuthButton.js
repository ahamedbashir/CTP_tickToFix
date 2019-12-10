import React from 'react';
import { Nav } from 'react-bootstrap';

import { withRouter, Link } from 'react-router-dom';

import auth from '../services/auth';

const classes = "btn btn-primary";

const AuthButton = withRouter(({ history }) => {
  if (sessionStorage.isAuthenticated !== "true") {
    return <Nav>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/signup">Signup</Nav.Link>
    </Nav>

  }

  const logout = () => {
    auth.signout().then(() => history.push('/'));
  }

  return (
    <Nav>
      Welcome!
      <Nav.Link className={classes} onClick={logout}>Logout</Nav.Link>
    </Nav>
  );
});

export default AuthButton;
