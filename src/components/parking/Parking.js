import React from 'react';
import { isAuthenticated, getUserInfo, getParking, updateParking } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import './parking.css';

export default class Parking extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            auth: true,
            parking: ''
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        if(isAuthenticated())
        getUserInfo()
            .then((userDetails) => {
                this.setState({userDetails: userDetails})
            })
            .then(this.getParkingInfo())
            .catch(err => {
                alert('You Need to Login to view this page');
                this.setState({
                    auth: false
                })
            })
        else {
            alert('User Not Authenticated');
            this.setState({auth: false})
        }
    }
    getParkingInfo() {
        getParking()
        .then(res => {
            this.setState({parking: res[0].parking})
        })
        .catch(err => {
            console.log(err)
            
        })
    }
    onChange(e) {
        e.preventDefault()
        updateParking(e.target.value)
        .then(res => {
            this.getParkingInfo()
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {

        return (
            <div className="col-lg-6 col-md-6 col-sm-12">
            {(this.state.auth) ? '' : <Redirect to="/" />}
                <div className="card">
                    <div className="cardHeader">
                        Do you need parking?
                    </div>
                    <div className="cardMain">
                        <select value={this.value} defaultValue="Default" onChange={this.onChange.bind(this) }>
                            <option value="Default" disabled hidden>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="cardFooter">
                        <p>You Responded {this.state.parking}</p>
                    </div>
                </div>
            </div> 
        )
    }
}