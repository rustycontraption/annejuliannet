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
                    I thrive when I have no idea what I'm doing.  The struggle from total ignorance, to enough knowledge
                    to feel totally compenent, to enough knowledge to comprehend just how incompetent I am, to actual competence
                    is a joy for me.  This website is a documentation of such struggles (and joys).
                </p>
                <p>Slightly more about me:</p>
                <p>
                    I was born in Seattle at the Swedish and have lived here my entire life.  
                    While traveling across the country for work and fun I expected to find some 
                    other place I liked more, or that maybe suited me more.  It seemed to me that most people
                    left their hometown for better places.  After most major cities in America, small towns less
                    than a mile wide, and a lot of land in between I never did find a place I felt more
                    at home than Seattle, or that had everything that the Pacific Northwest offered.  So here I am,
                    a rare native Seattleite, which people always seem delighted by when they find out.
                </p>
                <p>
                    I work in IT with a focus on development operations.  No other field that I know of changes 
                    as quickly and constantly as information technology, particularly devops.  When I become 
                    competent enough in something that it becomes routine I quickly become bored and my productivity 
                    evaporates, so constant challenges and the requirement to regularly learn new things is critical 
                    for my success.  
                </p>
                
            </React.Fragment>
        );
    }
  }
