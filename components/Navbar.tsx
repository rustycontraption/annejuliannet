import React from 'react';
import { BrowserRouter as Navlink, Link } from 'react-router-dom'
import styled from 'styled-components';
import { 
    Row, 
    Col, 
    Menu,
    Icon,
    Dropdown
} from 'antd';
import useWindowDimensions from '../components/Utils'

const { SubMenu } = Menu;

const Brand = styled.h1 `
    font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
    color: #fff; 
    font-size: 1.5rem;
    font-weight:800;
    letter-spacing:1px;
    padding-left: 1.5rem;
    margin: 0;
    white-space: nowrap;
    float:left;
`

const TopBar = styled(Row)`
    position: absolute;
    width:100%;
    z-index:10;
    height:3rem;
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
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <SubMenu title="Projects">
            <Menu.Item><Link to="/dive">D.I.V.E.</Link></Menu.Item>
            <Menu.Item><Link to="/rabbit">rabbit</Link></Menu.Item>
            <Menu.Item><Link to="/gs750">gs750</Link></Menu.Item>
            <Menu.Item><Link to ="/miniped">miniped</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="3"><Link to="/about">about</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/contact">contact</Link></Menu.Item>
    </Menu>
)

class DesktopNav extends React.Component{
    
    render(){
        return(
            <Menu mode="horizontal" style={desktop}>
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <SubMenu title="Projects">
                    <Menu.Item><Link to="/dive">D.I.V.E.</Link></Menu.Item>
                    <Menu.Item><Link to="/rabbit">rabbit</Link></Menu.Item>
                    <Menu.Item><Link to="/gs750">gs750</Link></Menu.Item>
                    <Menu.Item><Link to ="/miniped">miniped</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="3"><Link to="/about">about</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/contact">contact</Link></Menu.Item>
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
                    <a className="ant-dropdown-link" href="#">
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
            <TopBar type="flex" align="middle" style={style(width)}>
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
            </TopBar>
    )
}

export default Navbar
