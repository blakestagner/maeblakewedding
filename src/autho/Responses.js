import React from 'react';
import { Redirect } from 'react-router-dom';
import Parking from '../components/parking/Parking';
import RSVP from '../components/RSVP/RSVP';
import graphic from '../img/pics/side_img.webp';

export function Responses(props) {

    return (
        <div>
            {props.isLoggedIn ? '' : <Redirect to="/login" />}
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
export default Responses;