import React from 'react';
import Lightbox from 'react-image-lightbox';

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
            <React.Fragment>            
                <button type="button" onClick={() => this.setState({ isOpen: true })}>
                    Open Lightbox
                </button>

                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.mainSrc()}
                        nextSrc={this.nextSrc()}
                        prevSrc={this.prevSrc()}
                        enableZoom={false}
                        reactModalStyle={{
                    
                            boxSizing: 'border-box',
                            padding: 0,
                            color: 'rgba(0, 0, 0, 0.65)',
                            fontSize: '14px',
                            fontVariant: 'tabular-nums',
                            lineHeight: 1.5,
                            listStyle: 'none',
                            position: 'relative',
                            top: '100px',
                            width: 'auto',
                            margin: '0 auto',
                            paddingBottom: '24px',
                            pointerEvents: 'none'
                            
                            

                        }}
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
            </React.Fragment> 
        );
    }
  }