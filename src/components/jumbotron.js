import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import FadeIn from 'react-fade-in';

import bgImage from '../assets/img/vampy.jpg'
import bgImage2 from '../assets/img/nagato.jpg';
import bgImage3 from '../assets/img/umi.png';

const jumbotronStyle = {
    backgroundImage : 'url(' + bgImage + ')',
    backgroundSize : 'cover',
    backgroundPosition : 'center top',
    height : '100vh',
    verticalAlign : 'middle',
};

const FullWidthJumbotron = styled.div`
    background-size : cover;
    background-position : center top;
    height : 100vh;
    vertical-align : middle
`;


class Jumbotron extends Component {
    BottomSeparator = () => {
        return(
            <div className="container-fluid mt-3 mb-3">
                <div className="container bg-white">
                    <h1>Placeholder. There will be cut-out SVG here</h1>
                </div>
            </div>
        )
    }

    handleClick = () => {
        $(".transition").removeClass("hide");
        $(".transition").addClass("show");
        setTimeout(() => {
            this.props.history.push('/blog');
        }, 1000);
      }

    render() {
        return (
            <>
                <div id="homepage">

                
                <section id="firstSection">
                    <div id="topGradient"></div>
                    <div className="jumbotron jumbotron-fluid mb-0 sectionSnap" id="jumbotronImageWrapper" style={jumbotronStyle}>
                        <div className="container" >
                            <div className="row align-items-start pt-5 mt-4" style={{height : '75vh'}}>
                                <div className="col text-right" style={{zIndex : '3'}}>
                                    <FadeIn>
                                        <h3 style={{color : 'white', fontWeight : '100'}}>Akatsuki no Hikari</h3><br/><br/>
                                        <h3 style={{color : 'white', fontWeight : '100'}}><a href="#" onClick={this.handleClick}>Go to Blog</a></h3>
                                    </FadeIn>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="bottomGradient"></div>
                </section>
                <section id="secondSection">
                    <div className="container-fluid m-0 p-0 sectionSnap" style={{ backgroundColor : "black", height : "100vh" }}>
                        <div className="container h-100">
                            <div className="row h-100 justify-content-center align-items-end p-3 pb-5 pt-5">
                                <div className="col text-right" >
                                    <h3 style={{ color : '#FFFFFF88'}}><a href="/blog">"People die if they are killed."</a></h3>
                                    <p style={{ color : '#FFFFFF44'}}>-Emiya Shirou-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="thirdSection" style={{height : '100vh'}}>
                    <div id="topGradient"></div>
                    <FullWidthJumbotron className="sectionSnap" style={{ backgroundImage : "url(" + bgImage2 + ")"}}>
                        <div className="container-fluid h-100">
                            <div className="container h-100 pt-3 pb-3">
                                <div className="row h-100 justify-content-center align-items-center">
                                    <div className="col text-left" style={{zIndex : '3'}}>
                                        <h3 style={{color : '#000'}}>Coming soon</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FullWidthJumbotron>
                    <div id="bottomGradient"></div>
                </section>
                </div>
            </>
        )
    }
}

export default withRouter(Jumbotron);