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

const { Footer } = Layout;

export class AJFooter extends React.Component{

    render(){
        return(
            <Footer>Anne Julian ©2019</Footer>
            
        )
    }
}
