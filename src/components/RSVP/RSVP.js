import React from 'react';
import { isAuthenticated, getUserInfo, getRSVP, updateRSVP, getPlusone, updatePlusone, checkPlusone, coupleId, getCoupleInfo, getCoupleRSVP } from '../../autho/Repository';

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
    render() {
        return (
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card">
                        <div className="cardHeader">
                            RSVP to the Wedding
                        </div>
                        <div className="cardMain">
                            Will you be Attending the Wedding?
                            <select value={this.value} defaultValue="Default" onChange={this.changeRSVP.bind(this) }>
                                <option value="Default" disabled hidden>Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <br />
                            Current Response: {this.state.rsvp}
                            <br />
                            <br />
                            {(this.state.hasPlusone == "Yes") ? 
                                (
                                <div>
                                    Are you bringing a Plus One?
                                    <select value={this.value} defaultValue="Default" onChange={this.changePlusone.bind(this) }>
                                        <option value="Default" disabled hidden>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    Response:{this.state.plusone}
                                </div>        
                                ) : ''
                            }
                        </div>
                        <div className="cardFooter">
                            Does this person have a Plus One? {this.state.hasPlusone}
                        </div>
                    </div>
                </div>
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
        getCoupleInfo(29)
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
    updateCouple() {
        console.log('hi')
    }
    render() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-12" >
                <div className="card">
                    <div className="cardHeader">
                        RSVP to the Wedding for you Other Half: {this.state.name}
                    </div>
                    <div className="cardMain">
                        Will {this.state.name} Be Joining You?
                        <select value={this.value} defaultValue="Default" onChange={this.updateCouple.bind(this) }>
                            <option value="Default" disabled hidden>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <br />
                        Current Response: {this.state.rsvp}
                        <br />
                        <br />
                    </div>
                    <div className="cardFooter">
                        
                    </div>
                </div>
            </div>
        )
    }
}