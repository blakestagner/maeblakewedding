import React from 'react';
import { isAuthenticated } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import './profile.css'
import LoggedinUser from '../loggedinUser/LoggedinUser'
import RSVP from '../RSVP/RSVP'

class Profile extends React.Component {
    constructor() {
        super();
        this.state = { 
            auth: true };
        }
       
componentDidMount() {
    if( isAuthenticated() )
    return;
    else {
        alert('User Not Authenticated');
        this.setState({auth: false})
    }
}
    render() {
        return (
            <div className="container">
                {(this.state.auth) ? '' : <Redirect to="/" />}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <h1>Profile</h1>
                        <LoggedinUser />
                        <RSVP />
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile;