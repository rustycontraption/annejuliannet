import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Navlink, Link } from 'react-router-dom'

export default class About extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <React.Fragment>
                <p>
                   I make things, go places, and learn stuff. 
                </p>               
            </React.Fragment>
        );
    }
  }
