import React from 'react';
import { Masthead } from '../components/Masthead';
import Navbar from '../components/Navbar'
import Gallery from '../components/Gallery'
import ProjectList from '../components/ProjectList'
import{ AJFooter as Footer }  from '../components/Footer';
import { 
    Row, 
    Col, 
    Layout
} from 'antd';

const { Content } = Layout;

interface Props{
   page: string;
}

const Title = {
    home: "projects",
    rabbit: "rabbit",
    gs750: "gs750",
    miniped: "miniped",
    dive: "d.i.v.e.",
    about: "about",
    contact: "contact"
}

const Subtitle = {
    home: "build, break, fix, repeat",
    rabbit: "project car, daily driven",
    gs750: "brat conversion",
    miniped: "probably a bad idea",
    dive: "marine 24/7 livestream",
    about: " ",
    contact: " "
}

export class App extends React.Component<Props,{}>{

    constructor(props: Props){
        super(props) 
    }

    pageContent(page){
        if (page == "home") {
            return (
                <ProjectList />    
            )
        }

        if (page == "contact") {
            return (
                <p>contact</p>
            )
        }

        return (
            <Gallery page={page} />
        )  
    }
    
    render(){
        const {page} = this.props
        console.log(page)
        return(
            <Layout className="layout" >
                <Navbar />
                <Masthead 
                    page={page}
                    title={Title[page]}
                    subtitle={Subtitle[page]}
                />
                <Content style={{ padding: '0 50px' }}>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16}>
                            {this.pageContent(page)}
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                </Content>
                <Footer />
            </Layout>
        )
    }
}

