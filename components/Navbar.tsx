import React from 'react';
import styled from 'styled-components';
import { 
    Row, 
    Col, 
    Menu,
    Icon,
    Dropdown
} from 'antd';

import useWindowDimensions from '../components/Utils.tsx'

import "../static/public/styles/main_react.css";

const { SubMenu } = Menu;

const Brand = styled.h1 `
    font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
    color: #fff; 
    font-size: 1.5rem;
    font-weight:800;
    letter-spacing:1px;

    padding-left: 1.5rem;
    margin: 0;

    float:left;
`

const mobile = {
    backgroundColor: '#fff',
    color: '#000',
}

const desktop = {
    backgroundColor: 'transparent',
    color: '#fff'
}

const menu = (style) => (
    <Menu style={style}>
        <Menu.Item key="1"></Menu.Item>
        <SubMenu title="Projects">
            <Menu.Item>D.I.V.E.</Menu.Item>
            <Menu.Item>Rabbit</Menu.Item>
            <Menu.Item>GS750</Menu.Item>
            <Menu.Item>Miniped</Menu.Item>
        </SubMenu>
        <Menu.Item key="3">About</Menu.Item>
        <Menu.Item key="4">Contact</Menu.Item>
    </Menu>
)

class DesktopNav extends React.Component{
    
    render(){
        return(
            <Menu mode="horizontal" style={desktop}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Projects</Menu.Item>
                <Menu.Item key="3">About</Menu.Item>
                <Menu.Item key="4">Contact</Menu.Item>
             </Menu>
        )
    }
}


class MobileNav extends React.Component{
    
    render(){
        return(
            <div style={{
                float:'right',
                paddingRight: '1.5rem',
            }} 
            >
                <Dropdown overlay={menu(mobile)} trigger={['click']}>
                    <a className="ant-dropdow-link" href="#">
                        <Icon 
                            type="menu-unfold"
                            style={{
                                fontSize:'2rem',
                                color: '#000'
                            }}
                        />
                    </a>
                </Dropdown>
            </div>
        )
    }
}

const Navbar = () => {
    const {width, height} = useWindowDimensions()
    const style = (width) => {
        if (width < 768){
            return mobile
        }else{
            return desktop
        }
    }

    return(
        <React.Fragment>
            <Row type="flex" align="middle" style={style(width)}>
                <Col span={12}>
                    <Brand style={style(width)}> Anne Julian</Brand>
                </Col>
                <Col span={12} >
                    {
                        width < 768 
                            ? <MobileNav />
                            : <DesktopNav />
                    }
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Navbar
