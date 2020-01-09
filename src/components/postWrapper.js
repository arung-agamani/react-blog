import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Post from './post';
import styled from 'styled-components';
import axios from 'axios';

import WrapperImg from '../assets/img/animeSky.jpg';

const WrapperBg = styled.div`
    background-position : center center;
    background-size : cover;
    background-attachment : fixed
`;

const WrapperWhiteOverlay = styled.div`
    background-color : #FFFFFFAA;
`;

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus risus at ultrices mi tempus. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Nibh tellus molestie nunc non blandit massa. Eu volutpat odio facilisis mauris. Auctor eu augue ut lectus arcu bibendum. Sit amet aliquam id diam maecenas ultricies mi eget. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Amet mattis vulputate enim nulla. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Adipiscing bibendum est ultricies integer quis auctor elit. Sed egestas egestas fringilla phasellus faucibus scelerisque. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Cursus turpis massa tincidunt dui ut ornare lectus sit. Sed pulvinar proin gravida hendrerit lectus. Ut tellus elementum sagittis vitae et leo. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Ultricies mi eget mauris pharetra et ultrices neque. Cursus in hac habitasse platea dictumst quisque sagittis. Odio euismod lacinia at quis risus sed vulputate odio. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Feugiat pretium nibh ipsum consequat nisl. Eget est lorem ipsum dolor sit amet consectetur adipiscing. Sit amet volutpat consequat mauris nunc congue nisi vitae. Habitant morbi tristique senectus et. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Netus et malesuada fames ac turpis egestas sed tempus urna. Nisl nunc mi ipsum faucibus. Justo laoreet sit amet cursus. Senectus et netus et malesuada fames ac turpis. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Tincidunt tortor aliquam nulla facilisi cras. Amet mattis vulputate enim nulla aliquet porttitor lacus. Aliquam id diam maecenas ultricies. Nibh praesent tristique magna sit. Elit ut aliquam purus sit amet luctus. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Eu sem integer vitae justo eget magna. Id diam maecenas ultricies mi eget. Iaculis nunc sed augue lacus viverra vitae congue eu. Faucibus in ornare quam viverra orci sagittis eu volutpat odio. Faucibus et molestie ac feugiat. Scelerisque eleifend donec pretium vulputate. Nam at lectus urna duis convallis convallis tellus. Ornare arcu odio ut sem nulla pharetra diam. Ut consequat semper viverra nam libero justo laoreet sit. Sem nulla pharetra diam sit amet nisl suscipit. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Sed libero enim sed faucibus turpis in eu. Pellentesque habitant morbi tristique senectus et netus et malesuada. Volutpat diam ut venenatis tellus in metus. Sem fringilla ut morbi tincidunt augue. Morbi tempus iaculis urna id. Faucibus et molestie ac feugiat sed. Purus viverra accumsan in nisl nisi scelerisque. At elementum eu facilisis sed odio morbi quis commodo odio. Ullamcorper malesuada proin libero nunc. Habitant morbi tristique senectus et netus et. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Id cursus metus aliquam eleifend mi in. In nisl nisi scelerisque eu ultrices. Augue interdum velit euismod in pellentesque. Massa sed elementum tempus egestas sed. Donec et odio pellentesque diam.";

class PostSection extends Component {
    state = {
        placeholder : lorem,
        posts : [],
        isLoaded : false
    }
    componentDidMount() {
        console.log(this.props);
        if (this.props.isIndividual == false) {
            axios.post('http://127.0.0.1:3000/post')
            .then(posts => {
                this.setState({
                    posts : posts.data.slice(0,5),
                    isLoaded : true,
                });
            });
        } else {
            console.log("individual post triggered");
            axios.post('http://127.0.0.1:3000/post/single', { "title" : this.props.match.params.title})
                .then(post => {
                    this.setState({
                        posts : [post.data]
                    });
                });
        }
    }
    render() {
        const posts = this.state.posts;
        let postList;
        let postLinkList;
        if (this.state.posts) {
            postList  = posts.map(post => {
                return (
                    <Post title={post.title} content={post.blogContent} key={post._id} link={post.link} />
                )
            });
        } else {
            <Post title="No posts..."/>
        }
        
        return (
            <>
                <WrapperBg className="container-fluid" id="postWrapper" style={{backgroundImage : "url(" + WrapperImg + ")"}}>
                    <WrapperWhiteOverlay className="container">
                        <div className="row">
                            <div className="col-12 col-md-9">
                                { postList }
                            </div>
                            <div className="col-3 d-none d-md-flex d-lg-flex d-xl-flex">
                                <div className="container pt-3 pb-3">
                                    <div className="row bg-white h-100">
                                        <div className="col">
                                            <h1>Placeholder</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </WrapperWhiteOverlay>
                </WrapperBg>
            </>
        )
    }
}

export default PostSection;