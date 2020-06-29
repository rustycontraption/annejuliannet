import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Navlink, Link } from 'react-router-dom'

interface ContactState{
    name: string;
    email: string;
    message: string;
    error: boolean;
}

const TextInput = styled.input`
    width: 100%;
    border: 0;
    background: #333;
`

const TextBox = styled.textarea`
    width: 100%;
    border: 0;
    background: #333;
`

export default class Contact extends React.Component<{}, ContactState> {
    constructor(props) {
      super(props);
   
      this.state = {
        name:'',
        email:'',
        message:'',
        error: false,
      };
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }
    
    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }

    resetForm(){
        this.setState({
            name: '', 
            email: '', 
            message: ''
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();

        fetch(`/make_contact`,{
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((res)=>{
            if (res.status != 200){
                this.setState({
                    error: true,
                })
                alert("Fail")
            } else {
                this.setState({
                    error: false
                })
                this.resetForm()
                alert("Success")
            }
            return res.json()    
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <Row gutter={2}>
                        <Col span={4}></Col>
                        <Col span={6} align-content="top">
                            <label htmlFor="name">name</label>
                        </Col>
                        <Col span={8}>
                            <TextInput type="text" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    <br />
                    <Row gutter={2}>
                        <Col span={4}></Col>
                        <Col span={6} align-content="top">
                            <label htmlFor="exampleInputEmail1">email address</label>
                        </Col>
                        <Col span={8}>
                            <TextInput type="email" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    <br />
                    <Row gutter={2}>
                        <Col span={4}></Col>
                        <Col span={6} align-content="top">
                            <label htmlFor="message">message</label>
                        </Col>
                        <Col span={8}>
                            <TextBox rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    <Row gutter={2}>
                        <Col span={4}></Col>
                        <Col span={14}>
                            <button type="submit">submit</button>
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    
                </form>
            </React.Fragment>
        );
    }
  }
