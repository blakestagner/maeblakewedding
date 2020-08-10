import React from 'react';
import { getSpecialTips, isAuthenticated } from './Repository';
import { Redirect } from 'react-router-dom';
import './Home.css'
import Parking from '../components/parking/Parking';
import RSVP from '../components/RSVP/RSVP';

export default class Responses extends React.Component {
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
            <div className="profile">
                {(this.state.auth) ? '' : <Redirect to="/" />}
                <h1>Loggedin Home</h1>
                <h2></h2>
                <Parking />
                <RSVP />

            </div>
        )
    }
}