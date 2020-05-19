import React from 'react';
import Lightbox from 'react-image-lightbox';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { BrowserRouter as Navlink, Link } from 'react-router-dom'

const GalleryContainer = styled.div`
    width:90%
    display: block;
    position: relative;
    margin: auto;
`

const ImgThumb = styled.img`
    border: 1px solid #555;
    margin: .3rem;
    padding: 0px;
`

const GalleryButton = styled.button`
    border: none;
    padding: 0px;
    background: none;
    margin: 0px;
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

interface LightboxProps {
    page: string;
}

interface GalleryImgDetails{
    name: string;
    details: string;
}

interface LightboxState{
    photoIndex: number;
    isOpen: boolean;
    images: GalleryImgDetails[];
    error: boolean;
    isLoading: boolean;
    s3: string;
    showModal: string;
    pageTracker: string;
}

const ProjectPreview = (props) => {
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
                    <Col span={4}><img src={props.thumbnail} /></Col>
                </Row>
            </Link>
        )
    }

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <ProjectPreview 
                    title = { "mini moped" }
                    thumbnail = { "https://static.annejulian.net/static/img/dive/DIVEcam8_sm.jpg" }
                    details = { "Slovenian moped motor in a Chinese pitbike frame with American electronics, rolling on Japanese tires" }
                    page = { "/miniped" }
                />
                <hr />
                <ProjectPreview 
                    title = { "D.I.V.E." }
                    thumbnail = { "https://static.annejulian.net/static/img/dive/DIVEcam8_sm.jpg" }
                    details = { "24/7 underwater live stream built from webcams, PVC pipes, and spare parts" }
                    page = { "/dive" }
                />
                <hr />
                <ProjectPreview
                    title = { "1981 VW Rabbit" }
                    thumbnail = { "https://static.annejulian.net/static/img/rabbit/rabbit_sm.jpg" }
                    details = { "project car, daily driven" }
                    page = { "/rabbit" }
                />
                <hr />
                <ProjectPreview
                    title = { "1982 Suzuki GS750T" }
                    thumbnail = { "https://static.annejulian.net/static/img/gs750/gs750_sm.jpg" }
                    details = { "a mediocre bike with potential" }
                />
            </React.Fragment>
        )
    }
}

export default class Gallery extends React.Component<LightboxProps, LightboxState> {
    constructor(props) {
      super(props);
   
      this.state = {
        photoIndex: 0,
        isOpen: false,
        images: [], 
        error: false,
        isLoading: true,
        s3: 'https://static.annejulian.net/static/img/',
        pageTracker: '',
        showModal: '0',
      };
    }

    fetchGallery(){
        if (this.props.page != "home") {
            fetch(`/get_gallery?page=${this.props.page}`, {
                method: 'GET',
                dataType:'json',
            })
            .then(res => {
                if (res.status != 200){
                    this.setState({
                        error: true,
                        isLoading: false,
                        images: []
                    })
                } else {
                    this.setState({
                        error: false
                    })
                }

                return res.json()
            })
            .then(data => {
                this.setState({
                    images: data,
                    isLoading: false
                })
            })
        }

        this.setState({
            error: false,
            isLoading: false
        })
    }

    componentDidMount(){
        this.fetchGallery()
        this.setState({
            s3: 'https://static.annejulian.net/static/img/' + this.props.page + '/',
            pageTracker: this.props.page
        })
    }

    componentDidUpdate(){
        if(this.state.pageTracker != this.props.page){
            this.fetchGallery()
            this.setState({
                s3: 'https://static.annejulian.net/static/img/' + this.props.page + '/',
                pageTracker: this.props.page
            })
        }
    }

    // Modal handling
    getModal = value => {
		this.setState({ showModal: value })
	}
	
	closeModal = value => {
		this.setState({ 
			showModal: '0',
		})
	}

    // Gallery image sources
    thumbnailSrc(thumbnail){
        return (
            this.state.s3 + thumbnail.name + '_sm.jpg'
        )
    }
    mainSrc(){
        return(
            this.state.s3 + this.state.images[this.state.photoIndex].name + '.jpg'
        )
    }


    nextSrc(){
      
        return(
            this.state.s3 + this.state.images[(this.state.photoIndex + 1) % this.state.images.length].name + '.jpg'
        )
    }

    prevSrc(){
        if(this.state.photoIndex == 0){
            return(
                this.state.s3 + this.state.images[this.state.images.length - 1].name + '.jpg'
            )
        }

        return(
            this.state.s3 + this.state.images[(this.state.photoIndex - 1) % this.state.images.length].name + '.jpg'
        )
    }
    

    render() {
        if (this.state.isLoading){
            return(
                <span>loading...</span>
            )
        }

        if (this.state.error){
            return(
                <span>Oops, something went wrong...</span>
            )
        }

        const page = this.props.page;

        return (
            <React.Fragment>
                {
                    page == "home"
                        ? <ProjectList />
                        : <GalleryContainer>                     
                            {this.state.images.map((thumbnail, index) => (
                                <GalleryButton key={index} onClick={() => 
                                    this.setState({ 
                                        isOpen: true,
                                        photoIndex: index
                                    })}
                                >
                                    <ImgThumb src={this.thumbnailSrc(thumbnail)} />
                                </GalleryButton>
                                )
                            )}
                        
                            {this.state.isOpen && (
                                <Lightbox
                                    mainSrc={this.mainSrc()}
                                    nextSrc={this.nextSrc()}
                                    prevSrc={this.prevSrc()}
                                    imageCaption={this.state.images[this.state.photoIndex].details}
                                    enableZoom={false}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                    onMovePrevRequest={() =>
                                        this.setState({
                                        photoIndex: (this.state.photoIndex + this.state.images.length - 1) % this.state.images.length,
                                        })
                                    }
                                    onMoveNextRequest={() =>
                                        this.setState({
                                        photoIndex: (this.state.photoIndex + 1) % this.state.images.length,
                                        })
                                    }
                                />
                            )}
                        </GalleryContainer> 
                }
            </React.Fragment>
        );
    }
  }
