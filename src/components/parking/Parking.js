import React from 'react';
import { getUserInfo, getParking, updateParking } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import './parking.css';

export default class Parking extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            parking: ''
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        getUserInfo()
            .then((userDetails) => {
                this.setState({userDetails: userDetails})
            })
            .then(this.getParkingInfo())
            .catch(err => {
                console.log(err)
            })
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
            this.successHandle('successMsg')
        })
        .catch(err => {
            console.log(err)
        })
    }
    successHandle(e) {
        let successMsg = document.getElementById(e)
        successMsg.innerHTML = 'Response Updated';
        setTimeout(() => successMsg.innerHTML = '', 2000);
    }
    render() {

        return (
            <div className="col-lg-6 col-md-6 col-sm-12">   
                <select value={this.value} defaultValue="Default" onChange={this.onChange.bind(this) }>
                    <option value="Default" disabled hidden>Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <p>You Responded {this.state.parking}</p>
                <p id="successMsg" className="successMsg"></p>
            </div> 
        )
    }
}