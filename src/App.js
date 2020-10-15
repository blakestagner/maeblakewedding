import React, {useEffect, useState} from 'react';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './grid/grid.css';
import Toolbar from './toolbar/Toolbar';
import Hero from './hero/Hero';
import Landing from './home/Landing';
import { Responses } from './autho/Responses'
import UserLogin from './register/UserLogin';
import Footer from './footer/Footer';
import { Calendar } from './components/calendar/Calendar';
import { ParkingHome } from './components/parking/ParkingHome';
import RSVPHome from './components/RSVP/RSVPHome';
import { isAuthenticated, getUserInfo } from './autho/Repository';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './components/admin/Dashboard';
import Authenticated from './autho/Authentication';
import Instagram from './instagram/Instagram';

export function App() {
  const [isLoggedIn, setLoggedin] = useState(true)
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    checkLoggedinStatus()
  }, [])

  const loggedIn = (data) => {
    data === true ? setLoggedin(true) : setLoggedin(false);
  }
  const handleLogin = (data) => {
    setLoggedin(true) 
    setUserDetails(data)
  }
  const checkLoggedinStatus = () => {
    if ( isAuthenticated() ){
    getUserInfo()
        .then((res) => {
            setLoggedin(true)
            setUserDetails(res)
        })
        .catch(err => {
          localStorage.removeItem('x-access-token');
          setLoggedin(false)
            })
    } else if ( localStorage.getItem('x-access-token-expiration') < Date.now()) {
        localStorage.removeItem('x-access-token-expiration');
        localStorage.removeItem('x-access-token');
        setLoggedin(false)
    } else {}
  }
    return (
      <div className="App">
        <Router>
          <ScrollToTop />
          <Authenticated loggedIn={loggedIn} />
          <Toolbar 
            userDetails={userDetails}
            isLoggedIn={isLoggedIn}
            loggedIn={loggedIn}/>
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
                      userDetails={userDetails} 
                      isLoggedIn={isLoggedIn}
                      handleLogin={handleLogin}/>
                  )} 
                  />
                <Route
                  exact 
                  path="/calendar" 
                  render={props => (
                    <Calendar 
                      {...props}
                      userDetails={userDetails} 
                      isLoggedIn={isLoggedIn}
                      />
                  )} 
                />
                <Route  exact 
                  path="/parking" 
                  render={props => (
                    <ParkingHome {...props} 
                    isLoggedIn={isLoggedIn}
                    userDetails={userDetails} 
                    />
                  )} 
                  />
                <Route  exact 
                  path="/RSVP" 
                  render={props => (
                    <RSVPHome {...props} 
                    isLoggedIn={isLoggedIn}
                    userDetails={userDetails}
                    />
                  )} 
                  />
                <Route  exact 
                  path="/home" 
                  render={props => (
                    <Responses {...props} 
                    isLoggedIn={isLoggedIn}
                    userDetails={userDetails}
                    />
                  )} 
                  />
                <Route  exact 
                  path="/dashboard" 
                  render={props => (
                    <Dashboard {...props} 
                    isLoggedIn={isLoggedIn}
                    userDetails={userDetails}
                    />
                  )} 
                  />
                <Route  exact 
                  path="/photos" 
                  render={props => (
                    <Instagram {...props} 
                    isLoggedIn={isLoggedIn}
                    userDetails={userDetails}
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

export default App;
