import React from 'react';
import { Parking } from './Parking';
import { ParkingInfo, ParkingOther } from './ParkingInfo'
import '../../home/home.css'
import { Redirect } from 'react-router-dom';
import venueLogo  from '../../img/venue/west_of_the_waterway.jpg';
import blakeLeft from '../../home/img/blake_left.jpg'
import maeRight from '../../home/img/mae_right.jpg';

export function Location(props) {

    return (
        <div>
            {props.isLoggedIn ? '' : <Redirect to="/login" />}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row">
                    <div className="homeText separator">
                        <h2>Venue</h2>
                        <img 
                            className="blake-left-venue"
                            src={blakeLeft} 
                            alt="Blake Left" />
                        <img 
                            className="mae-right-venue"
                            src={maeRight} 
                            alt="Mae Right" />
                        <img
                            alt="mae & Blake"
                            className="venue-logo"
                            src={venueLogo}/>
                        <Parking userDetails={props.userDetails}/>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row">
                        <div style={{maxWidth: '600px', margin: '0 auto'}}>
                            <div className="homeText">
                                <ParkingInfo isLoggedIn={props.isLoggedIn}/>
                                <ParkingOther />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Location;