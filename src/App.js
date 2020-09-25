import React from 'react';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './grid/grid.css';
import Toolbar from './toolbar/Toolbar';
import Hero from './hero/Hero';
import Landing from './home/Landing';
import { Responses } from './autho/Responses'
import UserLogin from './register/UserLogin';
import Profile from './components/profile/Profile';
import Footer from './footer/Footer';
import { Calendar } from './components/calendar/Calendar';
import { ParkingHome } from './components/parking/ParkingHome';
import RSVPHome from './components/RSVP/RSVPHome';
import { isAuthenticated, getUserInfo } from './autho/Repository'
import ScrollToTop from './components/ScrollToTop'
import Dashboard from './components/admin/Dashboard'

class App extends React.Component {
  constructor(){
    super();
      this.state = {
        isLoggedIn: false,
        userDetails: [],
      }
      this.handleLogin = this.handleLogin.bind(this)
  }
  componentDidMount() {
    this.checkLoggedinStatus();
  }
  handleLogin(data) {
    this.setState({isLoggedIn: true, userDetails: data})
  }
  checkLoggedinStatus() {
    if( isAuthenticated() )
    getUserInfo()
        .then((userDetails) => {
            this.setState({
              isLoggedIn: true, 
              userDetails: userDetails
            })
        })
        .catch(err => {
            console.log(err);
            })
    else {}
  }
  render() {
    return (
      <div className="App">
        <Router>
          <ScrollToTop />
          <Toolbar userDetails={this.state.userDetails}/>
          <Hero />
          <Switch>
            <React.Fragment>
              <div  className="main" id="main">
                <Route exact path="/" component={ Landing } />
                <Route
                  exact 
                  path="/login" 
                  render={props => (
                    <UserLogin 
                      {...props}
                      userDetails={this.state.userDetails} 
                      isLoggedIn={this.state.isLoggedIn}
                      handleLogin={this.handleLogin}/>
                  )} 
                  />
                <Route
                  exact 
                  path="/calendar" 
                  render={props => (
                    <Calendar 
                      {...props}
                      userDetails={this.state.userDetails} 
                      isLoggedIn={this.state.isLoggedIn}/>
                  )} 
                />
                <Route  exact 
                  path="/parking" 
                  render={props => (
                    <ParkingHome {...props} 
                    isLoggedIn={this.state.isLoggedIn}
                    userDetails={this.state.userDetails} 
                    />
                  )} 
                  />
                <Route path="/profile" component={ Profile } />
                <Route  exact 
                  path="/RSVP" 
                  render={props => (
                    <RSVPHome {...props} 
                    isLoggedIn={this.state.isLoggedIn}
                    userDetails={this.state.userDetails} 
                    />
                  )} 
                  />
                <Route  exact 
                  path="/home" 
                  render={props => (
                    <Responses {...props} 
                    isLoggedIn={this.state.isLoggedIn}
                    userDetails={this.state.userDetails} 
                    />
                  )} 
                  />
                <Route  exact 
                  path="/dashboard" 
                  render={props => (
                    <Dashboard {...props} 
                    isLoggedIn={this.state.isLoggedIn}
                    userDetails={this.state.userDetails} 
                    />
                  )} 
                  />
              </div>
            </React.Fragment>
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
