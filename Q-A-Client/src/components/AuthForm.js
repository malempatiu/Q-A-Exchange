import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAuthentication, addError } from '../actions/actions';
import { Redirect, Link } from 'react-router-dom';

export class AuthForm extends Component {
    state = {
        email: '',
        username: '',
        password: ''
    };
    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    };
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    };
    handleUsername = (e) => {
        this.setState({ username: e.target.value });
    };
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { signUp, userAuthentication } = this.props;
        const authType = signUp ? 'signup' : 'signin';
        if(this.state.password.length>=6){
        userAuthentication(authType, this.state);
        //document.getElementById('auth-form').reset();
        }else{
            this.props.addError("Check password length");
            //document.getElementById('auth-form').reset();
        };
    };
    render() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />
        }
        const { signUp, btnText, heading, error } = this.props;
        return (
            <div>
                <div className="container authform-cont">
                    <h1 className="text-center">{heading}</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <form id="auth-form" onSubmit={this.handleFormSubmit}>
                                <div className="form-group">
                                    <label className="font-weight-bold" htmlFor="email">Email:</label>
                                    <input type="text" className="form-control" id="email" onChange={this.handleEmail} />
                                    <small id="emailHelp" className="form-text text-muted">abc@abc.com</small>
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold" htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" id="password" onChange={this.handlePassword} />
                                    <small id="emailHelp" className="form-text text-muted">min.length 6</small>
                                </div>
                                {signUp && (
                                    <div className="form-group">
                                        <label className="font-weight-bold" htmlFor="username">Username:</label>
                                        <input type="text" className="form-control" id="username" onChange={this.handleUsername} />
                                    </div>
                                )}
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary form-control">{btnText}</button>
                                </div>
                            </form>
                            {signUp ?
                                <div className="container text-center">
                                    <p>Already have an account? <Link to="/signin">Log In</Link></p>
                                </div>
                                :
                                <div className="container text-center">
                                    <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.CurrentUser.isAuthenticated,
        error: state.Errors.error
    };
};

export default connect(mapStateToProps, { userAuthentication, addError })(AuthForm);