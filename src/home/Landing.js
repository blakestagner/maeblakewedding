import React from 'react';
import './home.css';
import graphic from '../img/pics/side_img.jpg';
import { CalenderContainer } from '../components/calendar/CalenderContainer'
import { ParkingInfo, ParkingOther } from '../components/parking/ParkingInfo'
import Loading from '../components/Loading'

function Home(props) {
    const doneLoadingRef = React.useRef()

    React.useEffect(() =>{
        doneLoadingRef.current.loadingStatus()
    }, [])
    
    
    return (
        <div className="landing-container">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row-no-gutters">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
                        <img src={graphic} className="imgLeft firstImg" alt="Mae and Blake"/>
                        <div className="imgLeftMobile firstImg"></div>
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 col-lg-push-1">
                        <div className="row HomeText separator">
                            <h1>Calendar</h1>
                            <Loading ref={doneLoadingRef}/>
                            <CalenderContainer
                                    wparty="n"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 homeText">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5 ">
                        
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 col-lg-push-1">
                        <ParkingInfo
                            isLoggedIn={props.isLoggedIn}/>
                        <ParkingOther />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;