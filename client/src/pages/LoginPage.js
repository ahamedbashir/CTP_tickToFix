import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';

import auth from '../services/auth';

class LoginPage extends React.Component {
  state = {
    redirectToReferrer: false,
    failed: false,
    email: "",
    password: "",
  }

  fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      this.setState({ [name]: value });
    }
  }

  login = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    auth.authenticate(email, password)
      .then((user) => {
        this.setState({ redirectToReferrer: true });
      })
      .catch((err) => {
        this.setState({ failed: true });
      });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, failed } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    let err = "";
    if (failed) {
      err = <div className="alert alert-danger" role="alert">Login Failed</div>;
    }

    return (
      // <form onSubmit={this.login}>
      //   <div className="form-row">
      //     { err }
      //     <input 
      //       type="email"
      //       className="form-control"
      //       name="email"
      //       placeholder="Email" 
      //       value={this.state.email} 
      //       onChange={this.fieldChanged('email')} />
      //     <input 
      //       type="password"
      //       className="form-control"
      //       name="password"
      //       placeholder="Password" 
      //       value={this.state.password} 
      //       onChange={this.fieldChanged('password')} />
      //     <button 
      //       type="submit"
      //       className="btn btn-primary ml-auto"
      //     >Login</button>
      //   </div>
      // </form>
      <div className="container-fluid col-10 col-md-8 col-lg-7 mt-5">
        {err}
        <form className="form-group text-left" onSubmit={this.login}>
          <div className="form-row">
            <div className="form-group col-sm-6">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                className="form-control mr-6 rounded col"
                id="inputEmail"
                placeholder="Email"
                value={this.state.email}
                onChange={this.fieldChanged('email')}
              />
            </div>

            <div className="form-group col-sm-6">
              <label htmlFor="inputTel">Password</label>
              <input
                type="password"
                className="form-control mr-6 rounded col"
                id="inputPassword"
                placeholder="Password"
                value={this.state.password}
                onChange={this.fieldChanged('password')}
              />
            </div>

          </div>
          <div className="text-center"><Button variant="primary" className="m-*-auto mb-5 mt-3" type="submit">Login</Button></div>
          
        </form>
        <div className="tex-center mt-5">
          <div className="h4">Don't have an account? <Nav.Link className="" href="/signup">Signup</Nav.Link></div>
        </div>
      </div>
    );
  }
}

export default LoginPage;