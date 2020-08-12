import React from 'react';
import './parking.css';
import Parking from './Parking';
import '../../home/home.css'
import graphic from '../../img/pics/Mae.JPG';
import { isAuthenticated } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';

export default class ParkingHome extends React.Component {
    constructor() {
        super();
        this.state = { 
            auth: true };
        }
componentDidMount() {
    if( !isAuthenticated() ) {
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
                <div className="homeText row">
                    <h2>Do you need a prepaid Parking Spot?</h2>
                    <Parking />
                </div>
            </div>
        )
    }
}