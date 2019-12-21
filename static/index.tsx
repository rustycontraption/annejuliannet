import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom'


import { App } from '../static/App.tsx'
import { Masthead } from '../components/Masthead';
import{ AJFooter as Footer }  from '../components/Footer';

import { 
    Row, 
    Col, 
    Layout
} from 'antd';
const { Content } = Layout;

import "../static/public/styles/main_react.css";


interface MatchParams {
    page: string;
}

interface MatchProps extends RouteComponentProps<MatchParams>{}

const NotFound = () => {
    return(
        <h3 style={{color:'#fff'}}>404</h3>
    )
}

class Routes extends React.Component<MatchProps, any>{
    render(){
        return(
            <Router>
            <div>
                <Switch>
                    <Route exact path="/" render={() => <App page="home" />} />
                    <Route path="/:page(rabbit|gs750|miniped|dive)" render={( {match}: MatchProps) => (
                        <App page={match.params.page} /> )} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    )}
}

ReactDOM.render(<Routes/>,document.getElementById("content"))
