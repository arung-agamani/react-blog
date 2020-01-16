import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { set } from 'mongoose';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class Post extends Component {
    state = {
        title : null,
        author : null,
        datePosted : null,
        content : null,
        isReady : false,
    };

    componentDidMount(){
        document.querySelector(".transition").classList.remove("show");
        document.querySelector(".transition").classList.add("hide");
        let date = new Date(this.props.datePosted);
        console.log(date);
        this.setState({
            title : this.props.title,
            author : this.props.author ? (this.props.author) : ("No info on author."),
            datePosted : date.getDate() + " " + monthNames[date.getMonth()] + ", " + date.getFullYear(),
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
                    <div className="container">
                        <div className="row" style={{backgroundColor : '#FAFAFADD'}}>
                            <div className="col pt-3 pb-3">
                                <div className="row">
                                    <div className="col-md" id="blog-post-container">
                                    <div className="post-header" style={{borderBottom : '1px solid gray'}}>
                                        <h1><a href={"/blog/" + this.props.link} onClick={this.handleLinkClick}>{this.state.title}</a></h1>
                                        <p>Posted on {this.state.datePosted} by {this.state.author}</p>
                                    </div>
                                    <div className="post-content pt-3" dangerouslySetInnerHTML={{ __html : this.state.content}}>
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