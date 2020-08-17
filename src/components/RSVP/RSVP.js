import React from 'react';
import { isAuthenticated, getUserInfo, getRSVP, updateRSVP, getPlusone, updatePlusone, checkPlusone, coupleId, getCoupleInfo, getCoupleRSVP, updateCoupleRSVP } from '../../autho/Repository';
import checkboxBlank from '../../img/icons/check_box_outline_blank-black.svg';
import checkboxCheck from '../../img/icons/check_box-black.svg';

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
        return (
                <div className="col-xs-12 col-sm-7 col-md-7 col-lg-5 col-lg-push-1">
                <h2>RSVP to the Wedding</h2>
                    Will you be Attending the Wedding?
                    <div className="checkBoxContainer">
                        <div className="checkBoxImg">
                            <p>Yes:</p>
                            <div onClick={() => {this.onCheckRSVP('Yes')}}>
                                <img className="checkBox" alt="checkbox"src={this.state.rsvp == 'Yes' ? checkboxCheck : checkboxBlank } />    
                            </div> 
                        </div>
                        <div className="checkBoxImg">
                            <p>No: </p>  
                            <div onClick={() => {this.onCheckRSVP('No')}}>
                                <img className="checkBox" alt="checkbox"src={this.state.rsvp == 'No' ? checkboxCheck : checkboxBlank } />    
                            </div>
                        </div>
                    </div>
                    <br />
                    Current Response: {this.state.rsvp}
                    <p id="successMsg1" className="successMsg" ></p> 
                    <br />
                    <br />
                    {(this.state.hasPlusone == "Yes") ? 
                        (
                        <div>
                            Are you bringing a Plus One?
                            <div className="checkBoxContainer">
                                <div className="checkBoxImg">
                                    <p>Yes:</p>
                                    <div onClick={() => {this.onCheckPlusone('Yes')}}>
                                        <img className="checkBox" alt="checkbox"src={this.state.plusone == 'Yes' ? checkboxCheck : checkboxBlank } />    
                                    </div> 
                                </div>
                                <div className="checkBoxImg">
                                    <p>No: </p>  
                                    <div onClick={() => {this.onCheckPlusone('No')}}>
                                        <img className="checkBox" alt="checkbox"src={this.state.plusone == 'No' ? checkboxCheck : checkboxBlank } />    
                                    </div>
                                </div>
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
                <div className="checkBoxContainer">
                    <div className="checkBoxImg">
                        <p>Yes:</p>
                        <div onClick={() => {this.checkCoupleRSVP('Yes')}}>
                            <img className="checkBox" alt="checkbox"src={this.state.rsvp == 'Yes' ? checkboxCheck : checkboxBlank } />    
                        </div> 
                    </div>
                    <div className="checkBoxImg">
                        <p>No: </p>  
                        <div onClick={() => {this.checkCoupleRSVP('No')}}>
                            <img className="checkBox" alt="checkbox"src={this.state.rsvp == 'No' ? checkboxCheck : checkboxBlank } />    
                        </div>
                    </div>
                </div>
                <br />
                Current Response: {this.state.rsvp}
                <p id="successMsg3" className="successMsg"> </p>
                <br />
                <br />
            </div>
        )
    }
}