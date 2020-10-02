import React from 'react';
import './register.css';
import { login, getUserInfo } from '../autho/Repository';
import { isAuthenticated } from '../autho/Repository';
import {TextField } from '@material-ui/core';

export default class UserLogin extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        
      }
      this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    }
componentDidMount() {
    if( isAuthenticated() )
    this.props.history.push("/home")
}
handleSuccessfulAuth(data) {
  this.props.handleLogin(data)
  this.props.history.push("/home")
}
  render() {
    return (
        <div className="user-login">
            <div className="box-controller">
              <LoginBox  handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>
            <div className="box-controller login-details-container">
              <p className="login-details">Once logged in you will be able to 
              <span className="login-details-bold"> RSVP</span> for you and your guest, 
              <span className="login-details-bold"> request a reserved parking spot, </span>
              and access the wedding party, Groomsmen, and Briadesmaids
              <span className="login-details-bold"> calanders</span></p>       
            </div>
        </div> 
    )
  }
}
class LoginBox extends React.Component {
  constructor() {
    super();
       this.state = { 
           email: '', 
           password: '',
           loggingIn: false
       };
       this.handleInputChange =this.handleInputChange.bind(this);
       this.submitLogin =this.submitLogin.bind(this);
       }
   
      handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
      }
      submitLogin(e){
          e.preventDefault();
          const lgnMsg = document.getElementById('loginMessage')
          this.logginginMessage()
          if (this.state.email === '') {
            this.removeLogginginMessage()
            lgnMsg.innerHTML = 'You forgot to type in your email'
          } else if (this.state.password === '') {
            this.removeLogginginMessage()
            lgnMsg.innerHTML = 'You forgot to type in your password'
          } else if (!this.state.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
            this.removeLogginginMessage()
            lgnMsg.innerHTML = 'You didnt enter a valid email'
        } else {
            login(this.state)
            .then(res =>
              getUserInfo()
                .then(res=> {
                  this.props.handleSuccessfulAuth(res)
                })
                .catch(err => {
                  this.removeLogginginMessage()
                  console.log(err)
                })
            )
            .catch(err => { 
              this.removeLogginginMessage() 
              lgnMsg.innerHTML = err
            })
          }
        setTimeout(() => lgnMsg.innerHTML = '', 3500 )
      }
      logginginMessage() {
        this.setState({loggingIn: true})
      }
      removeLogginginMessage() {
        this.setState({loggingIn: false})
      }
  render() {
    return (
      <div className="inner-container">
          <div className="header">
            Login
          </div>
            <div className="space-below">
                <TextField 
                  fullWidth={true}
                  required={true}
                  id="email" 
                  label="email"
                  name="email"
                  onChange={ this.handleInputChange }
                />
            </div>
            <div className="space-below">
                <TextField 
                fullWidth={true}
                required={true}
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
                id="login-btn" 
                className="login-btn" 
                onClick={ this
                .submitLogin
                .bind(this)}>{this.state.loggingIn ? 'Logging in' : 'Login'}</button>
              {this.state.loggingIn ? <LoginAnimation /> : ''}
          
      </div>
    )
  }
}
const LoginAnimation = () => {

  return (
    <div className="loader">
      <div className="duo duo1">
        <div className="dot dot-a"></div>
        <div className="dot dot-b"></div>
      </div>
      <div className="duo duo2">
        <div className="dot dot-a"></div>
        <div className="dot dot-b"></div>
      </div>
    </div>
  )
}