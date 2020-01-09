import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import axios from 'axios';

import Jumbotron from './jumbotron';
import PostWrapper from './postWrapper';
import Homepage from './homepage';

const navStyle = {
    backgroundColor : "#3a5075"
};

const About = styled.div`
    background-color : #AAAAAA;
`;

class Navbar extends Component {
    handleHomeClick = () => {
        $(".transition").removeClass("hide");
        $(".transition").addClass("show");
        setTimeout(() => {
            this.props.history.push('/');
        }, 500);
    }

    handlePageLoaded = () => {
        $(".transition").removeClass("show");
        $(".transition").addClass("hide");
    }

    render() {
        return (
            <>
                <header className="navbar navbar-expand-md navbar-dark flex-md-row flex-column" id="navbar" style={navStyle}>
                    <button className="navbar-toggler d-md-none" type="button" data-toggle="collapse" data-target="#navbarToggleItems" aria-controls="navbarToggleItems" aria-expanded="false" aria-label="Open Navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarToggleItems">
                        <ul className="navbar-nav">
                            <li className="navbar-brand nav-item">
                                <a href="/" onClick={this.handleHomeClick}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Login</a>
                            </li>
                            <li className="nav-item">
                                <a href="/blog" className="nav-link">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Bot</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Projects</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">About Me</a>
                            </li>
                        </ul>
                    </div>
                </header>
                <PostWrapper isIndividual={this.props.isIndividual} />
            </>
        );
    }
}

export default withRouter(Navbar);