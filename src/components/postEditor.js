import React, { Component } from 'react';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Quill from 'react-quill';
import PostWrapper from './postWrapper';
import 'react-quill/dist/quill.snow.css';

class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title : '',
            postDescription : '',
            postImageHeaderLink : '',
            quillValue : '',
            isPostPicked : false,
            isInEditor : true,
            id : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSavePost = this.handleSavePost.bind(this);
        this.handleSwitchView = this.handleSwitchView.bind(this);
        this.handleOpenViewer = this.handleOpenViewer.bind(this);
    }

    handleChange(value) {
        this.setState({
            quillValue : value
        })
    }

    handleOpenViewer() {
        this.setState({
            title : document.getElementById("postTitle").value,
            postDescription : document.getElementById("postDescription").value,
        })
    }
    


    handleSavePost() {
        let date = new Date();
        const postData = {
            title : document.getElementById("postTitle").value,
            description : document.getElementById("postDescription").value,
            imageheader : document.getElementById("postImageHeaderLink").value,
            datePosted : date,
            author : 'Haruka Shiroyuki',
            blogContent : this.state.quillValue,
            link : document.getElementById("postTitle").value.toLowerCase().split(' ').join('-'),
        }
        console.log(postData);
        axios.post('/crudPost', {
            action : "UPDATE",
            id : this.state.id,
            password : document.getElementById("password").value,
            postData : postData
        }).then(res => {
            alert(res.data.status);
        })
    }

    handleSwitchView() {
        if (this.state.isInEditor) {
            this.setState({
                isInEditor : false,
            });

        } else {
            this.setState({
                isInEditor : true,
            });
        }
    }

    componentDidMount(){
        axios.post("/post/single", { title : this.props.match.params.title})
            .then(result => {
                console.log(result);
                this.setState({
                    title : result.data.title,
                    postDescription : result.data.description,
                    quillValue : result.data.blogContent,
                    id : result.data._id
                });
            })
        
        document.querySelector("body").style.backgroundColor = "white";
        document.querySelector(".transition").classList.remove("show");
        document.querySelector(".transition").classList.add("hide");       
    }
    render() {
        return(
            <>
                <header>
                    <div className="editor-nav">
                        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                            <a href="/blogEditor" className="navbar-brand">Editor</a>
                            <div className="container">
                                <div className="row w-100">
                                    <div className="col text-center editor-toggle">
                                        <Link to={"/blogEditor/" + this.props.match.params.title}>WYSIWYG Quill.js</Link>
                                    </div>
                                    <div className="col text-center editor-toggle">
                                        <Link to={"/blogEditor/" + this.props.match.params.title + "/preview"} onClick={this.handleOpenViewer}>Preview</Link>
                                    </div>
                                </div>
                            </div>
                            <span className="navbar-text" onClick={this.handleSavePost}>Save Post</span>                            
                        </nav>
                    </div>
                </header>
                <Switch>
                    <Route exact path={"/blogEditor/" + this.props.match.params.title}>
                        <div className="editor">
                            <div className="container-fluid p-0 m-0 editor-container" style={{backgroundColor: 'white'}}>
                                <div className="container-fluid p-3" style={{backgroundColor : 'white'}}>
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="editor-header">
                                                <h3>Title</h3>
                                                <input type="text" name="postTitle" id="postTitle" defaultValue={this.state.title}/>
                                                <h3>Metadata</h3>
                                                <h5>Description</h5>
                                                <input type="text" name="postDescription" id="postDescription" defaultValue={this.state.postDescription}/>
                                                <h5>Image Header</h5>
                                                <input type="text" name="postImageHeaderLink" id="postImageHeaderLink"/>
                                                <h5>Password</h5>
                                                <input type="password" name="password" id="password"/>
                                            </div>
                                            <div className="editor-quill">
                                                <h3>Editor</h3>
                                                <div className="editor-quill-container">
                                                    <Quill value={this.state.quillValue} onChange={this.handleChange} placeholder="Edit contents here..." />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="editor-image-gallery">
                                                <p>There will be image gallery here</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Route>
                    <Route path={"/blogEditor/" + this.props.match.params.title + "/preview"}>
                        <section>
                            <div className="container pt-3 pb-3">
                                <div className="row" style={{backgroundColor : '#FAFAFADD'}}>
                                    <div className="col pt-3 pb-3">
                                        <div className="row">
                                            <div className="col-md" id="blog-post-container">
                                            <div className="post-header pb-2" style={{borderBottom : '1px solid gray'}}>
                                                <h1><a href="#">{this.state.title}</a></h1>
                                                <p>{this.state.author}</p>
                                                <p>Posted on ...</p>
                                            </div>
                                            <div className="post-content" dangerouslySetInnerHTML={{ __html : this.state.quillValue}}>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Route>
                </Switch>
                
            </>
        );
    }
}

export default withRouter(PostEditor);