import React from 'react';
import { isAuthenticated, getUserInfo, getRSVP, updateRSVP } from '../../autho/Repository';

export default class RSVP extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            auth: true,
            rsvp: ''
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        if(isAuthenticated())
        getUserInfo()
            .then((userDetails) => {
                this.setState({userDetails: userDetails})
            })
            .then(this.getRSVPInfo())
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
            console.log(res[0])
            this.setState({rsvp: res[0].RSVP})
        })
        .catch(err => {
            console.log(err)
        })
    }
    onChange(e) {
        e.preventDefault()
        updateRSVP(e.target.value)
        .then(res => {
            this.getRSVPInfo()
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="card">
                    <div className="cardHeader">
                        RSVP to the Wedding
                    </div>
                    <div className="cardMain">
                        <select value={this.value} defaultValue="Default" onChange={this.onChange.bind(this) }>
                            <option value="Default" disabled hidden>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="cardFooter">
                        {this.state.rsvp}
                    </div>
                </div>
            </div>
        )
    }
}