import React from 'react';
import { Masthead } from '../components/Masthead';
import{ AJFooter as Footer }  from '../components/Footer';
import { 
    Row, 
    Col, 
    Layout
} from 'antd';
import "../static/public/styles/main_react.css";

const s3 = 'https://static.annejulian.net/static/img/'

const { Content } = Layout;

interface Props{
   page: string;
}

// Testing stuff

const TestProps = {
    page: 'rabbit',
    title: 'rabbit',
    subtitle: 'engine swap',
    content: '',
    next: 'gs750',
    prev: 'miniped',
    images: [
        {"name":"rabbit","details":""},
        {"name":"carb","details":""},
        {"name":"throttlecable","details":"FUN FACT: I now carry a fire extinguisher in the car after the machine screws holding the carb together backed out, the top half of the carb separated from the bottom half, and the whole thing caught on fire."},
        {"name":"pulley","details":""},
        {"name":"sketching","details":""},
        {"name":"fusebox","details":"FUN FACT: I wired the first ignition coil wrong and it exploded.  The coil pictured is a second one I had lying around my garage."},
        {"name":"fuelpump","details":""},
        {"name":"regulator","details":""},
   ]
}

// End testing stuff
export class App extends React.Component<Props, {}>{

    // postPreview({page, img, postTitle, postDetails}){
    //     return(
    //         <div>
    //             <img className="preview" src={s3 + page + img}></img>
    //         </div>
    //     )
    // }

    render(){

        return(
            <Layout className="layout" >
                <Masthead 
                    page={this.props.page}
                    title="projects"
                    subtitle="build, break, fix, repeat"
                />
                <Content style={{ padding: '0 50px' }}>
                    <Row>
                        <Col span={4}>col-8</Col>
                        <Col span={16} style={{background:'blue'}}>
                            Test
                        </Col>
                        <Col span={4}>col-8</Col>
                    </Row>
                </Content>
                <Footer />
            </Layout>
        )
    }
}


