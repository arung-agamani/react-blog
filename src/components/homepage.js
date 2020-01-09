import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Jumbotron from './jumbotron';

class Homepage extends Component {
    
    render() {
        console.log(this.props);
        return(
            <Jumbotron />
        )
    }
}

export default withRouter(Homepage);