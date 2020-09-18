import React, {useEffect, useState} from 'react';
import { isAuthenticated } from './Repository';
import { Redirect } from 'react-router-dom';
import Parking from '../components/parking/Parking';
import RSVP from '../components/RSVP/RSVP';
import graphic from '../img/pics/Mae.jpg';

export function Responses(props) {
    const [authenticated, setAuthenticated] = useState(true)

    useEffect(() => {
        if( !isAuthenticated() ) {
            alert('Please log in to access this page')
            setAuthenticated(false)
        }
    }, [] )
    return (
        <div className="row-no-gutter">
            {authenticated ? '' : <Redirect to="/" />}
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
                <img src={graphic} className="imgLeft firstImg" alt="Mae and Blake"/>
                <div className="imgLeftMobile firstImg"></div>
            </div>
            <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                <div className="row">
                    <div className="homeText">
                    <h1>{props.userDetails.fname}, Your Responses</h1>
                        <RSVP userDetails={props.userDetails}/>
                        <Parking userDetails={props.userDetails}/>
                    </div>
                </div>
            </div>
        </div>
    )
    
}