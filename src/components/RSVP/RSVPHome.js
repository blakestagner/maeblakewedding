import React from 'react';
import RSVP from './RSVP';
import '../../home/home.css'
import graphic from '../../img/pics/Mae.JPG';

export default class RSVPHome extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {

        }
    }
    render() {
        return (
            <div className="row-no-gutter">
                <img src={graphic} className="imgLeft firstImg"/>
                <div className="imgLeftMobile firstImg"></div>
                <div className="homeText ">
                    <h2>RSVP to the Wedding</h2>
                    <RSVP />
                </div>
            </div>
        )
    }
}