import React from 'react';
import Lightbox from 'react-image-lightbox';
import styled from 'styled-components';

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

        return (
            <GalleryContainer>            
                            
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
        );
    }
  }