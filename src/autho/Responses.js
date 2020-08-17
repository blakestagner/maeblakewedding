import React from 'react';
import { getUserInfo, isAuthenticated } from './Repository';
import { Redirect } from 'react-router-dom';
import './Home.css'
import Parking from '../components/parking/Parking';
import RSVP from '../components/RSVP/RSVP';
import graphic from '../img/pics/Mae.JPG'

export default class Responses extends React.Component {
    constructor() {
        super();
        this.state = { 
            auth: true, 
            userDetails: []
        }
    }
componentDidMount() {
    if( isAuthenticated() )
    getUserInfo()
        .then((userDetails) => {
        this.setState({userDetails: userDetails})
        })
        .catch(err => {
            alert('You Need to Login to view this page');
            this.setState({
                auth: false
            })
        })
    else {
        alert('User Not Authenticated');
        this.setState({auth: false})
    }
}
    render() {
        return (
            <div className="row-no-gutter">
                {(this.state.auth) ? '' : <Redirect to="/" />}
                <img src={graphic} className="imgLeft firstImg"/>
                    <div className="imgLeftMobile firstImg"></div>
                    <div className="homeText">
                    <h1>{this.state.userDetails.fname} Your Responses</h1>
                        <RSVP />
                        <Parking />
                    </div>
            </div>
        )
    }
}