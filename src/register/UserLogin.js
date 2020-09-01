import React from 'react';
import './register.css';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { login } from '../autho/Repository'
import { isAuthenticated } from '../autho/Repository'
import {TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default class UserLogin extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        toHome: false
      }
    }
componentDidMount() {
    if( isAuthenticated() )
    this.props.history.push("/")
    this.setState({toHome: true})
    
}
handleSuccessfulAuth() {
  window.scrollTo(0,0)
  window.location.reload(false)
}
  render() {
    if (this.state.toHom === true) {
      return <Redirect to='/home' />
    } else;
    return (
        <div className="container">
            <div className="box-controller">
                <div className="controller">
                    Login
                </div>
            </div>
            <div className="box-controller">
              <LoginBox  handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>
        </div> 
    )
  }
}
class LoginBox extends React.Component {
  constructor(props) {
    super(props);
       this.state = { 
           email: '', 
           password: '',
       };
       this.handleInputChange =this.handleInputChange.bind(this);
       this.submitLogin =this.submitLogin.bind(this);
       }
   
       handleInputChange(event) {
          this.setState({[event.target.name]: event.target.value})
          }
       submitLogin(e){
           e.preventDefault();
           login(this.state)
           .then(res => 
             this.props.handleSuccessfulAuth()
           )
           .catch(err => 
              err)
           }
  render() {
    return (
      <div className="inner-container">
          <div className="header">
            Login
          </div>
            <div className="row space-under">
                <TextField 
                  id="email" 
                  label="email"
                  name="email"
                  onChange={ this.handleInputChange }
                />
            </div>
            <div className="row space-under">
                <TextField 
                  id="password" 
                  label="password"
                  name="password"
                  type="password"
                  onChange={ this.handleInputChange }
                />
            </div>
              <p id="loginMessage"></p>
              <button 
                type="button" 
                className="login-btn" 
                onClick={ this
                .submitLogin
                .bind(this)}>Login</button>
          
      </div>
    )
  }
}