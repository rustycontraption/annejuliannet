import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Row, 
    Col, 
    Menu,
    Layout
} from 'antd';

import "./public/styles/main_react.css";

const { Header, Content, Footer } = Layout;

const s3 = 'https://static.annejulian.net/static/img/'



// const Masthead = styled.div`
//     top:0;
//     left:0;
//     height:100%;
//     width:100%;
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-position: center;
// `

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

interface AppState {
     isLoading: boolean;
     showModal: string;
     error: boolean;
}

class App extends React.Component<{}, AppState> {
    constructor(props) {
		super(props)
		
		this.state = {
			isLoading: true,
			showModal: '0',
			error: false,
		};
    }

    masthead(){
        return(
            <div className="masthead" 
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

    render(){
        return(
            <Layout className="layout" >
                {this.masthead()}
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


ReactDOM.render(<App />, document.getElementById('content'));

