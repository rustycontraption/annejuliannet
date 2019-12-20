import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import "../static/public/styles/main_react.css";
import { App } from '../static/App'


interface MatchParams {
    page: string;
}

interface MatchProps extends RouteComponentProps<MatchParams>{}


export class Routes extends React.Component<MatchProps,{}>{
    render(){
        return(
            <Router>
            <div>
                <Switch>
                    <Route exact path="/" render={() => <App page="home" />} />
                    <Route path="/:page" render={( {match}: MatchProps) => (
                        <App page={match.params.page} /> )} />
                </Switch>
            </div>
        </Router>
    )}
}

ReactDOM.render(<Routes />,document.getElementById("content"))
