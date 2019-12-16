import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Router, Route } from 'react-router'
import ccreateBrowserHistory from 'history/createBrowserHistory'
import { Row, 
    Col, 
    Menu,
    Layout
} from 'antd';

import { Home } from '../components/Home'

import "./public/styles/main_react.css";
import { createBrowserHistory } from 'history';

const newHistory = createBrowserHistory();

interface AppState {
     isLoading: boolean;
     showModal: string;
     error: boolean;
}

class App extends React.Component<{}, AppState> {
    constructor(props) {
		super(props)
		
		this.state = {
			isLoading: true,
			showModal: '0',
			error: false,
		};
    }

    render(){
        return(
            <Router history={newHistory}>
                <div>
                    <Route exact path='/' component={Home} />
                </div>

            </Router>
            
      
        )
    }
}

ReactDOM.render(<App />, document.getElementById('content'));



