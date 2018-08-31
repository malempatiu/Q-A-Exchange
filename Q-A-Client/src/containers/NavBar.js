import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container">
                    <h1 className="navbar-brand text-white font-weight-bold">Q-A-Exchange</h1>
                    <div className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                        <span className="navbar-toggler-icon"></span>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <div className="navbar-nav ml-auto">
                            <Link className="nav-item nav-link btn btn-info text-white" to="/">Home</Link>
                            <Link className="nav-item nav-link btn btn-info text-white" to="/addquestion">Ask Question</Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    };
};

export default NavBar;