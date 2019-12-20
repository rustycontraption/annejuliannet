import React from 'react';
import styled from 'styled-components';
import { 
    Layout,
} from 'antd';

// Navbar import must end in .tsx even though vscode complains about it
import Navbar from '../components/Navbar.tsx'

import "../static/public/styles/main_react.css";

import useWindowDimensions from '../components/Utils.tsx'

const { Header } = Layout;

const s3 = 'https://static.annejulian.net/static/img/'

const Overlay = styled(Header)`
    top:0;
    left:0;
    height:100%;
    width:100%;
    padding:0;
    background-color:rgba(48,48,48,0.8);
`

const Heading = styled.div`
    text-align:center;
    padding: 6rem 0px 7rem 0;
    margin:0;
`

const Title = styled.h1`
    font-weight: 100;
    font-size: 5rem;
    color:#fff;
    line-height: 1.2;
    font-family: 'Raleway', sans-serif;
    margin-bottom: 1rem;
`

const Subtitle = styled.h1`
    font-weight: 200;
    font-size: 2rem;  
    color:#fff;  
    font-family: 'Raleway', sans-serif;
    margin:0;
`

interface MastheadProps {
    page: string;
    title: string;
    subtitle: string;

}

export class Masthead extends React.Component<MastheadProps>{
    constructor(props: MastheadProps) {
		super(props)
    }

    mastheadBg(){
        return(
            "url(" + s3 + this.props.page + "/mast" + this.props.page + ".jpg)"
        )
    }

   render(){
       return(
            <div className="masthead"
                style={{
                    backgroundImage: this.mastheadBg(),
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <Overlay>
                    <Navbar />
                    <Heading>
                        <Title>{this.props.title}</Title>
                        <Subtitle>{this.props.subtitle}</Subtitle>
                    </Heading>
                </Overlay>
            </div>
       )
   }
    
}