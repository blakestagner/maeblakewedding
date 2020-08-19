import React from 'react';
import './home.css';
import graphic from '../img/pics/Mae.JPG';
import CalenderContainer from '../components/calendar/CalenderContainer'


function Home() {
    
    return (
        <div className="home">
            <div className="row-no-gutters">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
                    <img src={graphic} className="imgLeft firstImg" alt="Mae and Blake"/>
                    <div className="imgLeftMobile firstImg"></div>
                </div>
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                    <div className="row">
                        <div className="homeText ">
                            <h1>Calendar</h1>
                            <CalenderContainer 
                                    wparty="n"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;