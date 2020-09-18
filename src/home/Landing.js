import React from 'react';
import './home.css';
import graphic from '../img/pics/Mae.jpg';
import { CalenderContainer } from '../components/calendar/CalenderContainer'
import { ParkingInfo, ParkingOther } from '../components/parking/ParkingInfo'


function Home(props) {
    
    return (
        <div className="landing-container">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row-no-gutters">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
                        <img src={graphic} className="imgLeft firstImg" alt="Mae and Blake"/>
                        <div className="imgLeftMobile firstImg"></div>
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 col-lg-push-1">
                        <div className="row HomeText">
                            <h1>Calendar</h1>
                            <CalenderContainer
                                    wparty="n"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <hr className="hr"/>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5 homeText">
                        <ParkingOther />
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 col-lg-push-1 homeText">
                        <ParkingInfo
                            isLoggedIn={props.isLoggedIn}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;