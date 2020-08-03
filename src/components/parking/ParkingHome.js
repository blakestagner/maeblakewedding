import React from 'react';
import './parking.css';
import Parking from './Parking';

export default class ParkingHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="container">
            <h1>Parking</h1>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <Parking />
                    </div>
                </div>
            </div>
        )
    }
}