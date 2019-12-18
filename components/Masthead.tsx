import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Router, Route } from 'react-router'
import { 
    Row, 
    Col, 
    Menu,
    Layout,
    Drawer,
    Button,
    Icon
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
const Title = styled.div`
    text-align:center;
    font-weight:300;
    padding:150px 0;
    color:#fff;
    font-size: 3rem;
    font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
`

interface MastheadProps {
    page: string;

}

export class Masthead extends React.Component<MastheadProps>{
    constructor(props: MastheadProps) {
		super(props)
    }

    mastheadType()  {
        return (
            "masthead " + this.props.page
        )
    }

   render(){
       return(
            <div className={this.mastheadType()}
                style={{
                    backgroundImage: "url(" + s3 + "masthead.jpg)",
                }}
            >
                <Overlay>
                    <Navbar />
                    <Title>projects</Title>
                </Overlay>

            </div>
       )
   }
    
}