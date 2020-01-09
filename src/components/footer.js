import React, { Component } from 'react'
import styled from 'styled-components';

const FooterWrapper = styled.div`
    background-color : #CCCCCC;
`;

const FooterContent = styled.div`
`;


class Footer extends Component {
    render() {
        return(
            <FooterWrapper className="container-fluid pt-3">
                <FooterContent className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-md">
                            <h4>This is a footer</h4>
                            <br/>
                            <br/>
                            <p>Akatsuki no Hikari is a website by Arung Agamani</p>
                            <p>Built using mongoDB, express.js, React.js, Node.js, and Bootstrap 4</p>
                        </div>
                    </div>
                </FooterContent>
            </FooterWrapper>
        )
    }
}

export default Footer;