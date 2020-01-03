import React from 'react';
import { Masthead } from '../components/Masthead';
import Navbar from '../components/Navbar'
import Gallery from '../components/Gallery'
import{ AJFooter as Footer }  from '../components/Footer';
import { 
    Row, 
    Col, 
    Layout
} from 'antd';
import "../static/public/styles/main_react.css";

const { Content } = Layout;

interface Props{
   page: string;
}

const Title = {
    home: "projects",
    rabbit: "rabbit",
    gs750: "gs750",
    miniped: "miniped",
    dive: "d.i.v.e."
}

const Subtitle = {
    home: "build,brake,fix,repeat",
    rabbit: "engine swap",
    gs750: "brat conversion",
    miniped: "probably a bad idea",
    dive: "marine 24/7 livestream"
}

export class App extends React.Component<Props,{}>{

    constructor(props: Props){
        super(props) 
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
                            <Gallery page={page} />
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                </Content>
                <Footer />
            </Layout>
        )
    }
}


