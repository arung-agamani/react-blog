import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { set } from 'mongoose';


class Post extends Component {
    state = {
        title : null,
        author : null,
        content : null,
        isReady : false,
    };

    componentDidMount(){
        document.querySelector(".transition").classList.remove("show");
        document.querySelector(".transition").classList.add("hide");
        this.setState({
            title : this.props.title,
            author : this.props.author ? ("Posted by " + this.props.author) : ("No info on author."),
            content : this.props.content,
            isReady : true,
        });
        
    }

    handleLinkClick = () => {
        document.querySelector(".transition").classList.remove("hide");
        document.querySelector(".transition").classList.add("show");
        setTimeout(() => {
            this.props.history.push('/blog/' + this.props.link);
        }, 500);
    }

    render() {
        if (this.state.isReady) {
            return (
                <section>
                    <div className="container pt-3 pb-3">
                        <div className="row" style={{backgroundColor : '#FAFAFADD'}}>
                            <div className="col pt-3 pb-3">
                                <div className="row">
                                    <div className="col-md" id="blog-post-container">
                                    <div className="post-header pb-2" style={{borderBottom : '1px solid gray'}}>
                                        <h1><a href={"/blog/" + this.props.link} onClick={this.handleLinkClick}>{this.state.title}</a></h1>
                                        <p>{this.state.author}</p>
                                        <p>Posted on ...</p>
                                    </div>
                                    <div className="post-content" dangerouslySetInnerHTML={{ __html : this.state.content}}>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
            return (
                <section>
                    <div className="container pt-3 pb-3">
                        <div className="row" style={{backgroundColor : '#FAFAFADD'}}>
                            <div className="col pt-3 pb-3">
                                <div className="row">
                                    <div className="col-md" id="blog-post-container">
                                    <h1>Loading...</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        
    }
    
}

export default withRouter(Post);