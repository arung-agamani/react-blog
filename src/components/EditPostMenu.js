import React, { Component } from 'react';
import axios from 'axios';
import Quill from 'react-quill';
import styled from 'styled-components';

import PostEditor from './postEditor';

let postList;

class EditPostMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postList : [],
            isEditor : false,
            isPreview : false,
            title : '',
            author : '',
            postDescription : '',
            quillValue : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNewPostClick = this.handleNewPostClick.bind(this);
        this.handlePreviewClick = this.handlePreviewClick.bind(this);
        this.handleSavePost = this.handleSavePost.bind(this);

    }

    handleChange(value) {
        this.setState({
            quillValue : value
        });
    }

    handleNewPostClick() {
        this.setState({
            isEditor : true,
        });
    }

    handlePreviewClick() {
        if (this.state.isPreview) {
            this.setState({
                isPreview : false,
            })
        } else {
            this.setState({
                isPreview : true,
                title : document.getElementById("postTitle").value,
                postDescription : document.getElementById("postDescription").value,
                postImageHeaderLink : document.getElementById("postImageHeaderLink").value,
            })
        }
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
            action : "CREATE",
            password : document.getElementById("password").value,
            postData : postData
        }).then(res => {
            alert(res.data.status);
        })
    }
 
    componentDidMount() {
        axios.post('/post')
            .then(posts => {
                    let tempArr = [];
                    posts.data.map(singlePost => {
                        const tempObj = {
                            title : singlePost.title,
                            id : singlePost._id,
                            linkTitle : singlePost.link
                        }
                        tempArr.push(tempObj);
                    });
                    this.setState({
                        postList : tempArr
                    })
                    // console.log(this.state.postList);
                    postList = this.state.postList.map(post => {
                        return(
                            <>
                                <tr>
                                    <td>{post.title}</td>
                                    <td>{post.id}</td>
                                    <td><a href={"/blogEditor/" + post.linkTitle}>Edit Post</a></td>
                                </tr>
                            </>
                        )
                    });
                    document.querySelector("body").style.backgroundColor = "white";
                    document.querySelector(".transition").classList.remove("show");
                    document.querySelector(".transition").classList.add("hide");
            });
    }

    render() {
        if (!this.state.isEditor) {
            return(
                <>
                    <div className="container-fluid">
                        <div className="container pt-3">
                            <div className="row">
                                <h3>Posts</h3>
                            </div>
                            <div className="row">
                                <h3><a href="#" onClick={this.handleNewPostClick}>New Post</a></h3>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <table style={{width : '100%'}}>
                                        <tbody>
                                            <tr>
                                                <th>Title</th>
                                                <th>ID</th>
                                                <th></th>
                                            </tr>
                                            { postList }
                                        </tbody>
                                            
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <>
                    <header>
                        <div className="editor-nav">
                            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                                <a href="/blogEditor" className="navbar-brand">Editor</a>
                                <div className="container">
                                    <div className="row w-100">
                                        <div className="col text-center editor-toggle">
                                            <a href="#" onClick={this.handlePreviewClick}>WYSIWYG Quill.js</a>
                                        </div>
                                        <div className="col text-center editor-toggle">
                                            <a href="#" onClick={this.handlePreviewClick}>Preview</a>
                                        </div>
                                    </div>
                                </div>
                                <span className="navbar-text" onClick={this.handleSavePost}>Save Post</span>                            
                            </nav>
                        </div>
                    </header>
                    { (this.state.isPreview == false) ? (
                        <div className="editor">
                                <div className="container-fluid p-0 m-0 editor-container" style={{backgroundColor: 'white'}}>
                                    <div className="container-fluid p-3" style={{backgroundColor : 'white'}}>
                                        <div className="row">
                                            <div className="col-9">
                                                <div className="editor-header">
                                                    <h3>Title</h3>
                                                    <input type="text" name="postTitle" id="postTitle" defaultValue={this.state.title} placeholder="Insert title here..."/>
                                                    <h3>Metadata</h3>
                                                    <h5>Description</h5>
                                                    <input type="text" name="postDescription" id="postDescription" defaultValue={this.state.postDescription} placeholder="Insert description here..."/>
                                                    <h5>Image Header</h5>
                                                    <input type="text" name="postImageHeaderLink" id="postImageHeaderLink" placeholder="Insert image header link here..."/>
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
                    ) : (
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
                    ) }
                </>
            );
        }
        
    }
}

export default EditPostMenu;