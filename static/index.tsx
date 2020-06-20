import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { App } from '../static/App'

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
                    <Route exact path="/contact" render={() => <App page="contact" />} />
                    <Route exact path="/dev" render={() => <App page="home" />} />
                    <Route path="/:page(rabbit|gs750|miniped|dive|about)" render={( {match}: MatchProps) => (
                        <App page={match.params.page} /> )} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    )}
}

ReactDOM.render(<Routes/>,document.getElementById("content"))
