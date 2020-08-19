import React from 'react';
import './register.css';
import { login } from '../autho/Repository'

export default class UserLogin extends React.Component {
  render() {
      return (
          <div className="container">
              <div className="box-controller">
                  <div className="controller">
                      Login
                  </div>
              </div>
              <div className="box-controller">
                <LoginBox />
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
           password: '' 
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
           .then(token => window.location = '/home')
           .catch(err => err)
           }
   

  render() {
    return (
      <div className="inner-container">
          <div className="header">
            Login
          </div>
          <div className="box">
              <div className="input-group">
                  <label htmlFor="e-mail">Username</label>
                  <input 
                    onChange={ this.handleInputChange }
                    className="login-input" 
                    type="text" 
                    name="email" 
                    placeholder="e-mail"/>
              </div>
              <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    onChange={ this.handleInputChange }
                    className="login-input" 
                    type="text" 
                    name="password" 
                    placeholder="password"/>
              </div>
              <p id="loginMessage"></p>
              <button 
              type="button" 
              className="login-btn" 
              onClick={ this
              .submitLogin
              .bind(this)}>Login</button>
          </div>
      </div>
    )
  }
}