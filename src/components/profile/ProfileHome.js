import React from 'react';
import Profile from './Profile'
import RSVP from '../RSVP/RSVP'

export default class ProfileHome extends React.Component {
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
        return  (
            <div className="container">
                <h1>Profile</h1>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <Profile />
                        <br />
                        <RSVP />
                    </div>
                </div>
            </div>
        )
    }
}