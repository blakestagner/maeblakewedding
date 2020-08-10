import React from 'react';
import './home.css';
import graphic from '../img/pics/Mae.JPG';
import CalenderContainer from '../components/calendar/CalenderContainer'


function Home() {
    
    return (
        <div className="home">
            <div className="row">
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                    <img src={graphic} className="imgLeft firstImg"/>
                    <div className="imgLeftMobile firstImg"></div>
                </div>
                <div className="col-xs-11 col-sm-6 col-md-6 col-lg-6 container">
                    <div className="homeText ">
                        <h1>Calendar</h1>
                        <CalenderContainer 
                                wparty="n"/>
                    </div>
                </div>
            </div>




            <div className="row homeRow2">
                <img src={graphic} className="imgRight"/>
                <div className="imgRightMobile"> </div>
                <div className="homeText">
                    <h3>Title 2</h3>
                    <p>Some More text</p>
                </div>
            </div>

            <div className="row homeRow3">
                <img src={graphic} className="imgLeft"/>
                <div className="imgLeftMobile"></div>
                <div className="homeText">
                    <h3>Title 3</h3>
                    <p>Some More text</p>
                </div>
            </div>

            <div className="row homeRow4">
                <img src={graphic} className="imgRight"/>
                <div className="imgReftMobile"> </div>
                <div className="homeText">
                    <h3>Title 4</h3>
                    <p>Some More text</p>
                </div>
            </div>
        </div>
    )
}
export default Home;