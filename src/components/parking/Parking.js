import React from 'react';
import { getUserInfo, getParking, updateParking } from '../../autho/Repository';
import './parking.css';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default class Parking extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            parking: ''
        };
        this.onCheck = this.onCheck.bind(this);
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
    successHandle(e) {
        let successMsg = document.getElementById(e)
        successMsg.innerHTML = 'Updated';
        const timer = setTimeout(() => successMsg.innerHTML = '', 1000);
    }
    onCheck(e) {
        updateParking(e)
        .then(() => {
            this.getParkingInfo()
        })
        .then(() => {
            this.successHandle('successMsg')
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {

        return (
            <div>
                <h2>Do you need a Prepaid Parking Spot?</h2>
                    <FormControlLabel
                        classes={{label: 'checkBoxLabel'}}
                        value="start"
                        control={
                                <Checkbox 
                                    checked={this.state.parking === 'Yes' ? true : false} 
                                    color="primary" 
                                    onClick={() => {this.onCheck('Yes')}} />}
                        label="Yes"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        classes={{label: 'checkBoxLabel'}}
                        value="No"
                        control={
                                <Checkbox 
                                    checked={this.state.parking === 'No' ? true : false} 
                                    color='secondary'
                                    onClick={() => {this.onCheck('No')}} />}
                        label="No"
                        labelPlacement="start"
                    />
                <p>You Responded {this.state.parking}</p>
                <p id="successMsg" className="successMsg"></p> 
            </div> 
        )
    }
}