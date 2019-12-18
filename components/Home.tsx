import React from 'react';
import { Masthead } from '../components/Masthead';
import{ AJFooter as Footer }  from '../components/Footer';
import { 
    Row, 
    Col, 
    Layout
} from 'antd';
import "../static/public/styles/main_react.css";

const { Content } = Layout;

export class Home extends React.Component{

    render(){
        return(
            <Layout className="layout" >
                <Masthead 
                    page="Home"
                />
                <Content style={{ padding: '0 50px' }}>
                    <Row>
                        <Col span={4}>col-8</Col>
                        <Col span={16} style={{background:'blue'}}>col-8</Col>
                        <Col span={4}>col-8</Col>
                    </Row>

                </Content>
                <Footer />
            </Layout>
        )
    }
}
