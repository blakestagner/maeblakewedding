import React from 'react';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './grid/grid.css';
import Toolbar from './toolbar/Toolbar';
import Hero from './hero/Hero';
import Landing from './home/Landing';
import Responses from './autho/Responses'
import UserLogin from './register/UserLogin';
import Profile from './components/profile/Profile';
import Footer from './footer/Footer';
import Login from './autho/login';
import Calendar from './components/calendar/Calendar';
import ParkingHome from './components/parking/ParkingHome';
import RSVP from './components/RSVP/RSVPHome';

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        isLoggedIn: false
      }
  }
  render() {
    return (
      <div className="App">
        <Router> 
          <Toolbar />
          <Hero />
          <Switch>
            <React.Fragment>
              <div  className="main" id="main">
                <Route exact path="/" component={ Landing } />
                <Route path="/login" component={ UserLogin } />
                <Route path="/calendar" component={ Calendar } />
                <Route path="/parking" component={ ParkingHome } />
                <Route path="/profile" component={ Profile } />
                <Route path="/RSVP" component={ RSVP } />
                <Route path="/home" component={ Responses } />
                <Route path="/autho/login" component={ Login } />
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
