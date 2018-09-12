import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logoutUser} from '../actions/actions';


export class NavBar extends Component {
    handleLogout = (e) => {
        this.props.logoutUser();       
    };
    render() {
        const { isAuthenticated, username } = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container">
                    <h1 className="navbar-brand text-white font-weight-bold">Q-A-Exchange</h1>
                    <Link className="nav-link" to="/">Home</Link>
                    <div className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                        <span className="navbar-toggler-icon"></span>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <div className="navbar-nav ml-auto">
                            {isAuthenticated ?
                                <div>
                                    <a className="nav-item nav-link text-success font-weight-bold" to="/">welcome {username}</a>
                                    <Link className="nav-item nav-link btn btn-info text-white" to="/userquestions">My Questions</Link>
                                    <Link className="nav-item nav-link btn btn-info text-white" to="/" onClick={this.handleLogout}>Log Out</Link>
                                </div>
                                :
                                <div>
                                    <Link className="nav-item nav-link btn btn-info text-white" to="/signup">Sign Up</Link>
                                    <Link className="nav-item nav-link btn btn-info text-white" to="/signin">Log In</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.CurrentUser.isAuthenticated,
        username: state.CurrentUser.user.username
    };
}

export default connect(mapStateToProps, {logoutUser})(NavBar);