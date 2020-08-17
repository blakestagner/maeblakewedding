import React from 'react';
import { getUserInfo, getParking, updateParking } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import './parking.css';
import checkboxBlank from '../../img/icons/check_box_outline_blank-black.svg';
import checkboxCheck from '../../img/icons/check_box-black.svg';

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
        successMsg.innerHTML = 'Response Updated';
        setTimeout(() => successMsg.innerHTML = '', 2000);
    }
    onCheck(e) {
        updateParking(e)
        .then(res => {
            this.getParkingInfo()
            this.successHandle('successMsg')
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {

        return (
            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-5 col-lg-push-1">
                <h2>Do you need a Prepaid Parking Spot?</h2>
                <div className="checkBoxContainer">
                    <div className="checkBoxImg">
                        <p>Yes:</p>
                        <div onClick={() => {this.onCheck('Yes')}}>
                            <img className="checkBox" alt="checkbox"src={this.state.parking == 'Yes' ? checkboxCheck : checkboxBlank } />    
                        </div> 
                    </div>
                    <div className="checkBoxImg">
                        <p>No: </p>  
                        <div onClick={() => {this.onCheck('No')}}>
                            <img className="checkBox" alt="checkbox"src={this.state.parking == 'No' ? checkboxCheck : checkboxBlank } />    
                        </div>
                    </div>
                </div>
                <p>You Responded {this.state.parking}</p>
                <p id="successMsg" className="successMsg"></p> 
            </div> 
        )
    }
}