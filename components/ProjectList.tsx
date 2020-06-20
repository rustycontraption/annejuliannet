import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { BrowserRouter as Navlink, Link } from 'react-router-dom'

const ImgThumb = styled.img`
    border: 1px solid #555;
    margin: .3rem;
    padding: 0px;
`

const PostTitle = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.3;
    color: #bcbcbc;
    font-family: 'Raleway', sans-serif;
`

const PostDetails = styled.p`
    font-size: 1.3rem;
    font-weight: 300;
    line-height: 1.3;
    color: #bcbcbc;
    font-family: 'Raleway', sans-serif;
`

const ProjectItem = (props) => {
    return(
        <Link to={props.page}>
            <Row 
                gutter={4}
                type="flex"
                style={{ 
                    justifyContent: "top",
                    paddingTop: "1rem" 
                }}
            >
                <Col span={16} align-content="top">
                    <PostTitle>{props.title}</PostTitle>
                    <PostDetails>{props.details}</PostDetails>
                </Col>
                <Col span={4}><ImgThumb src={props.thumbnail} /></Col>
            </Row>
        </Link>
    )
}

export default class ProjectList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <ProjectItem
                    title = { "mini moped" }
                    thumbnail = { "https://static.annejulian.net/static/img/dive/DIVEcam8_sm.jpg" }
                    details = { "probably a bad idea" }
                    page = { "/miniped" }
                />
                <hr />
                <ProjectItem 
                    title = { "D.I.V.E." }
                    thumbnail = { "https://static.annejulian.net/static/img/dive/DIVEcam8_sm.jpg" }
                    details = { "24/7 underwater live stream built from webcams, PVC pipes, and spare parts" }
                    page = { "/dive" }
                />
                <hr />
                <ProjectItem
                    title = { "1981 VW Rabbit" }
                    thumbnail = { "https://static.annejulian.net/static/img/rabbit/rabbit_sm.jpg" }
                    details = { "project car, daily driven" }
                    page = { "/rabbit" }
                />
                <hr />
                <ProjectItem
                    title = { "1982 Suzuki GS750T" }
                    thumbnail = { "https://static.annejulian.net/static/img/gs750/gs750_sm.jpg" }
                    details = { "a mediocre bike with potential" }
                    page = { "gs750" }
                />
            </React.Fragment>
        )
    }
}
