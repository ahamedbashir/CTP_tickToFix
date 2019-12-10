import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
            <div className="container-fluid col-10 col-md-8 col-lg-7 mt-5">
                {err}
                <form className="form-group text-left" onSubmit={this.signUp}>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                required
                                className="form-control mr-6 rounded col"
                                id="firstName"
                                placeholder="First Name"
                                value={this.state.firstName}
                                onChange={this.fieldChanged('firstName')}
                            />
                        </div>

                        <div className="form-group col-sm-6">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                required
                                className="form-control mr-6 rounded col"
                                id="lastName"
                                placeholder="Last Name"
                                value={this.state.lastName}
                                onChange={this.fieldChanged('lastName')}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="inputEmail">Email</label>
                            <input
                                type="email"
                                required
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
                                required
                                className="form-control mr-6 rounded col"
                                id="inputPassword"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.fieldChanged('password')}
                            />
                        </div>

                    </div>
                    
                    <div className="text-center"><Button variant="primary" className="m-*-auto" type="submit">Sign Up</Button></div>
                </form>
            </div>
        );
    }
}

export default SignUpPage;