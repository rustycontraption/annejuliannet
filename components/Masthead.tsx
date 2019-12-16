import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Router, Route } from 'react-router'
import { Row, 
    Col, 
    Menu,
    Layout
} from 'antd';

import "../static/public/styles/main_react.css";

const { Header, Content, Footer } = Layout;

const s3 = 'https://static.annejulian.net/static/img/'

const Overlay = styled(Header)`
    top:0;
    left:0;
    height:100%;
    width:100%;
    background-color:rgba(48,48,48,0.8);
`

const Brand = styled.h1 `
    font-size: 1.5rem;
    font-weight:800;
   
    letter-spacing:1px;
    line-height: 3;
    color: #fff; 
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
                    <Row type="flex" align="middle">
                        <Col span={6}>
                            <Brand>Anne Julian</Brand>
                        </Col>
                        <Col span={18}>
                            <Menu
                                mode="horizontal"
                            >
                                <Menu.Item key="1">Home</Menu.Item>
                                <Menu.Item key="2">Projects</Menu.Item>
                                <Menu.Item key="3">About</Menu.Item>
                                <Menu.Item key="4">Contact</Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Overlay>

            </div>
       )
   }
    
}