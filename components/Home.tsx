import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {Masthead} from '../components/Masthead'
import { Row, 
    Col, 
    Menu,
    Layout
} from 'antd';

import "../static/public/styles/main_react.css";

const { Header, Content, Footer } = Layout;

export class Home extends React.Component{

    render(){
        return(
            <Layout className="layout" >
                <Masthead page="Home" />
                <Content style={{ padding: '0 50px' }}>
                    <Row>
                        <Col span={4}>col-8</Col>
                        <Col span={16} style={{background:'blue'}}>col-8</Col>
                        <Col span={4}>col-8</Col>
                    </Row>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}
