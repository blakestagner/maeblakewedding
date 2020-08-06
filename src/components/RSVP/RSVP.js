import React from 'react';
import { isAuthenticated, getUserInfo, getRSVP, updateRSVP, getPlusone, updatePlusone, checkPlusone, coupleId, getCoupleInfo, getCoupleRSVP, updateCoupleRSVP } from '../../autho/Repository';

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
        if(isAuthenticated())
        getUserInfo()
            .then((userDetails) => {
                this.setState({userDetails: userDetails})
            })
            .then(this.getRSVPInfo())
            .then(this.checkHasPlusone())
            .then(this.getCoupleId())
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
    getRSVPInfo() {
        getRSVP()
        .then(res => {
            this.setState({rsvp: res[0].RSVP})
        })
        .catch(err => {
            console.log(err)
        })
    }
    changeRSVP(e) {
        e.preventDefault()
        updateRSVP(e.target.value)
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
    changePlusone(e) {
        e.preventDefault()
        updatePlusone(e.target.value)
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
        return (
            <div className="row">
                Will you be Attending the Wedding?
                <select value={this.value} 
                        defaultValue="Default" 
                        onChange={this.changeRSVP.bind(this) }>
                    <option value="Default" disabled hidden>Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <br />
                Current Response: {this.state.rsvp}
                <p id="successMsg1" className="successMsg" ></p> 
                <br />
                <br />
                {(this.state.hasPlusone == "Yes") ? 
                    (
                    <div>
                        Are you bringing a Plus One?
                        <select value={this.value} 
                                defaultValue="Default" 
                                onChange={this.changePlusone.bind(this) }>
                            <option value="Default" disabled hidden>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
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
                <select value={this.value} defaultValue="Default" onChange={this.changeCoupleRSVP.bind(this) }>
                    <option value="Default" disabled hidden>Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <br />
                Current Response: {this.state.rsvp}
                <p id="successMsg3" className="successMsg"> </p>
                <br />
                <br />
            </div>
        )
    }
}