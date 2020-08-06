import React from 'react';
import './home.css';
import graphic from '../img/pics/Mae.JPG';
import CalenderContainer from '../components/calendar/CalenderContainer'


function Home() {
    
    return (
        <div className="home">
            <div className="row">
                <img src={graphic} className="imgLeft firstImg"/>
                <div className="imgLeftMobile firstImg"></div>
                <div className="homeText ">
                    <h3>Title</h3>
                    <p>Some More text</p>
                    <CalenderContainer 
                            categoryName="Events For Wedding Party"
                            wparty="n"/>
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