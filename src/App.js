import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import Homepage from "./components/homepage";
import Navbar from "./components/navbar";
import Jumbotron from "./components/jumbotron";
import EditPostMenu from "./components/EditPostMenu";
import PostEditor from "./components/postEditor";

class root extends Component {
  state = {
    isLoaded : false,
    isDone : false,
    hasVisited : false,
  }

  componentDidMount() {
      setTimeout(() => {
        this.setState({
          isLoaded : true,
          hasVisited : true,
        })
      }, 500);
  }

  handleClick = () => {
    $(".transition").removeClass("hide");
    $(".transition").addClass("show");
  }

  render() {
      return (
        <>
          <Router>
            <div style={{height : '100vh', width : '100vw', background : 'black'}} className={this.state.isLoaded ? "transition hide" : "transition show"}>
              <div className="">
                <div className="container-fluid" style={{backgroundColor : "black", height : '100vh'}}>
                  <div className="row h-100 justify-content-center align-items-center">
                    <div className="col text-center">
                      <h1 style={{fontWeight : '100', color : 'white'}}>Fetching data...</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Switch>
              <Route path="/blogEditor/:title" component={PostEditor}/>
              <Route path="/blogEditor" component={EditPostMenu}/>
              <Route path="/blog/:title" component={Navbar}/>              
              <Route path="/blog">
                <Navbar isIndividual={false} />
              </Route>
              <Route path="/">
                <Homepage />
              </Route>
              <Route path="/about">
                  <Jumbotron />
              </Route>
            </Switch>
          </Router>
        </>
      );
    
  }
}

export default root;
