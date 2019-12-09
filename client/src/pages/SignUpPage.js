import React from 'react';
import { Redirect } from 'react-router-dom';

import auth from '../services/auth';

class SignUpPage extends React.Component {
    state = {
        redirectToReferrer: false,
        failed: false,
        firstName: '',
        lastName: '',
        email: "",
        password: "",
    }

    fieldChanged = (name) => {
        return (event) => {
            let { value } = event.target;
            this.setState({ [name]: value });
        }
    }

    signUp = (e) => {
        e.preventDefault();
        let { email, password, firstName, lastName } = this.state;
        auth.singUp(email, password, firstName, lastName)
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
            err = <div className="alert alert-danger" role="alert">Sign up Failed</div>;
        }

        return (
            <form onSubmit={this.signUp}>
                <div className="form-row">
                    {err}
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.fieldChanged('email')} />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.fieldChanged('password')} />
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.fieldChanged('firstName')} />
                    <input
                        type="text"
                        className="form-control"
                        name="lasstName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.fieldChanged('lastName')} />
                    <button
                        type="submit"
                        className="btn btn-primary ml-auto"
                    >Sign Up</button>
                </div>
            </form>
        );
    }
}

export default SignUpPage;