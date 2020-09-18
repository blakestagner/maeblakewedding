import React, {useEffect, useState} from 'react';
import { Parking } from './Parking';
import { ParkingInfo, ParkingOther } from './ParkingInfo'
import '../../home/home.css'
import graphic from '../../img/pics/Mae.jpg';
import { isAuthenticated } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';

export function ParkingHome(props) {
    const [authenticated, setAuthenticated] = useState(true)

    useEffect(() => {
        if( !isAuthenticated() ) {
            alert('Please log in to access this page')
            setAuthenticated(false)
        }
    }, [] )

    return (
        <div className="row-no-gutter">
            {(authenticated) ? '' : <Redirect to="/" />}
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
                <img src={graphic} className="imgLeft firstImg" alt="Mae and Blake"/>
                <div className="imgLeftMobile firstImg"></div>
            </div>
            <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                <div className="row">
                    <div className="homeText">
                        <Parking userDetails={props.userDetails}/>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
            <hr className="hr" />
                <div className="row">
                    <div className="homeText">
                        <ParkingInfo isLoggedIn={props.isLoggedIn}/>
                        <hr className="hr"/>
                        <ParkingOther />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ParkingHome