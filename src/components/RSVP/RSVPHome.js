import React from 'react';
import RSVP from './RSVP';

export default class RSVPHome extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {

        }
    }
    render() {
        return (
            <div className="container">
                <h1>RSVP</h1>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <RSVP />
                    </div>
                </div>
            </div>
        )
    }
}