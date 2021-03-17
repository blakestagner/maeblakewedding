import React from 'react';
import './home.css';
import graphic from '../img/pics/side_img_2.jpg';
import { CalendarContainer } from '../components/calendar/CalendarContainer';
import { ParkingInfo, ParkingOther } from '../components/parking/ParkingInfo';
import Loading from '../components/Loading';
import blakeLeft from './img/blake_left.jpg';
import maeRight from './img/mae_right.jpg';

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
                        <div className="row homeText separator">
                            <h1>Mae & Blake Stagner</h1>
                            <h3 style={{marginTop: '-30px', marginBottom: '50px'}}>
                                Family and Friends, please join us cuz we be getting married!
                            </h3>
                            <h1>Calendar</h1>
                            <Loading ref={doneLoadingRef}/>
                            <CalendarContainer
                                    wparty="n"/>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 homeText">
                <div className="row">
                    <div>
                        <img 
                            className="blake-left"
                            src={blakeLeft} 
                            alt="Blake Left" />
                        <img 
                            className="mae-right"
                            src={maeRight} 
                            alt="Mae Right" />
                        <div style={{maxWidth: '600px', margin: '0 auto'}}>
                            <ParkingInfo
                                isLoggedIn={props.isLoggedIn}/>
                        </div>        
                            <ParkingOther />
                    </div>
                </div>
            </div>*/}
        </div>
    )
}
export default Home;