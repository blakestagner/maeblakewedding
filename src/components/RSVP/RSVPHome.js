import React from 'react';
import RSVP from './RSVP';
import '../../home/home.css'
import graphic from '../../img/pics/side_img.webp';
import { Redirect } from 'react-router-dom';

export function RSVPHome(props) {

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
                        <RSVP userDetails={props.userDetails}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RSVPHome