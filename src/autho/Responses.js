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
        if( !isAuthenticated() ) {
            alert('User Not Authenticated');
            this.setState({auth: false})
        }
    }
    render() {
        const userDetails = this.props.userDetails
        return (
            <div className="row-no-gutter">
                {(this.state.auth) ? '' : <Redirect to="/" />}
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
                    <img src={graphic} className="imgLeft firstImg" alt="Mae and Blake"/>
                    <div className="imgLeftMobile firstImg"></div>
                </div>
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                    <div className="row">
                        <div className="homeText">
                        <h1>{userDetails.fname} Your Responses</h1>
                            <RSVP userDetails={this.props.userDetails}/>
                            <Parking userDetails={this.props.userDetails}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}