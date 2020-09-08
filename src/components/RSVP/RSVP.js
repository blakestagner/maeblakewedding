import React from 'react';
import { isAuthenticated, getUserInfo, getRSVP, updateRSVP, getPlusone, updatePlusone, checkPlusone, coupleId, getCoupleInfo, getCoupleRSVP, updateCoupleRSVP } from '../../autho/Repository';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default class RSVP extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            auth: true,
            rsvp: '',
            hasPlusone: '',
            plusone: '',
            coupleId: ''
        };
    }
    componentDidMount() {
        this.getRSVPInfo()
        this.checkHasPlusone()
        this.getCoupleId()
    }
    getRSVPInfo() {
        getRSVP()
        .then(res => {
            this.setState({rsvp: res[0].RSVP})
        })
        .catch(err => {
            console.log(err)
        })
    }
    onCheckRSVP(e) {
        updateRSVP(e)
        .then(res => {
            this.getRSVPInfo()
            this.successHandle('successMsg1')
        })
        .catch(err => {
            console.log(err)
        })
    }
    checkHasPlusone() {
        checkPlusone()
        .then(res => {
            this.setState({hasPlusone: res[0].hasPlusone})
        })

        .catch(err => {
            console.log(err)
        })
        .then(() => {         
            if(this.state.hasPlusone ? 'Yes' : 'No')  {
                this.getPlusoneInfo()
            } else ; 
        })
    }
    getPlusoneInfo() {
        getPlusone()
        .then(res => {
            this.setState({plusone: res[0].plusone})
        })
        .catch(err => {
            console.log(err)
        })
    }
    onCheckPlusone(e) {
        updatePlusone(e)
        .then(res => {
            this.getPlusoneInfo()
            this.successHandle('successMsg2')
        })
        .catch(err => {
            console.log(err)
        })
    }
    getCoupleId() {
        coupleId()
        .then(res => {
            this.setState({coupleId: res[0].couple})
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
        const userDetails = this.props.userDetails
        return (
                <div>
                <h2>RSVP to the Wedding</h2>
                    <p>Will you be Attending the Wedding?</p>
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="Yes"
                            control={
                                    <Checkbox 
                                        checked={this.state.rsvp === 'Yes' ? true : false} 
                                        color='secondary'
                                        onClick={() => {this.onCheckRSVP('Yes')}} />}
                            label="Yes"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="No"
                            control={
                                    <Checkbox 
                                        checked={this.state.rsvp === 'No' ? true : false} 
                                        color='secondary'
                                        onClick={() => {this.onCheckRSVP('No')}} />}
                            label="No"
                            labelPlacement="start"
                            />
                    <br />
                    Current Response: {this.state.rsvp}
                    <p id="successMsg1" className="successMsg" ></p> 
                    <br />
                    <br />
                    {(this.state.hasPlusone === "Yes") ? 
                        (
                        <div>
                            Are you bringing a Plus One?
                            <div className="checkBoxContainer">
                                <FormControlLabel
                                    classes={{label: 'checkBoxLabel'}}
                                    value="Yes"
                                    control={
                                            <Checkbox 
                                                checked={this.state.plusone === 'Yes' ? true : false} 
                                                color='secondary'
                                                onClick={() => {this.onCheckPlusone('Yes')}} />}
                                    label="Yes"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    classes={{label: 'checkBoxLabel'}}
                                    value="No"
                                    control={
                                            <Checkbox 
                                                checked={this.state.plusone === 'No' ? true : false} 
                                                color='secondary'
                                                onClick={() => {this.onCheckPlusone('No')}} />}
                                    label="No"
                                    labelPlacement="start"
                                    />
                            </div>
                            <br />
                            Response:{this.state.plusone}
                            <p id="successMsg2" className="successMsg" ></p> 
                        </div>
                            
                        ) : ''
                    }
                    {(this.state.coupleId > 0) ? 
                        (
                            <CoupleInfo coupleId={ this.state.coupleId }/>
                        ) : ''
                    }
                </div>
        )
    }
}
class CoupleInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            rsvp: ''
        }
    }
    componentDidMount() {
        this.setState({id: this.props.coupleId})
        getCoupleInfo(this.props.coupleId)
        .then(res => {
            this.setState({name: res[0].fname})
            getCoupleRSVP(this.state.id)
            .then(res => {
                this.setState({rsvp: res[0].RSVP})
            })
            .catch(err => console.log(err))
        })
        .catch(err => {
            console.log(err)
        })
    }
    changeCoupleRSVP(e) {
        e.preventDefault()
        updateCoupleRSVP(e.target.value, this.props.coupleId)
        .then(res => {
            getCoupleRSVP(this.state.id)
            .then(res => {
                this.setState({rsvp: res[0].RSVP})
                this.successHandle('successMsg3')
            })
            .catch(err => console.log(err))
        })
        .catch(err => {
            console.log(err)
        })
    }
    checkCoupleRSVP(e) {
        updateCoupleRSVP(e, this.props.coupleId)
        .then(res => {
            getCoupleRSVP(this.state.id)
            .then(res => {
                this.setState({rsvp: res[0].RSVP})
                this.successHandle('successMsg3')
            })
            .catch(err => console.log(err))
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
            <div >
                RSVP to the Wedding for you Other Half: {this.state.name}
                <br />
                Will {this.state.name} Be Joining You?
                    <FormControlLabel
                        classes={{label: 'checkBoxLabel'}}
                        value="Yes"
                        control={
                                <Checkbox 
                                    checked={this.state.rsvp === 'Yes' ? true : false} 
                                    color='secondary'
                                    onClick={() => {this.checkCoupleRSVP('Yes')}} />}
                        label="Yes"
                        labelPlacement="start"
                        />
                    <FormControlLabel
                        classes={{label: 'checkBoxLabel'}}
                        value="No"
                        control={
                                <Checkbox 
                                    checked={this.state.rsvp === 'No' ? true : false} 
                                    color='secondary'
                                    onClick={() => {this.checkCoupleRSVP('No')}} />}
                        label="No"
                        labelPlacement="start"
                        />
                <br />
                Current Response: {this.state.rsvp}
                <p id="successMsg3" className="successMsg"> </p>
                <br />
                <br />
            </div>
        )
    }
}