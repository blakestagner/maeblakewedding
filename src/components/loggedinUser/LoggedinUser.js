import React from 'react';
import { isAuthenticated, getUserInfo} from '../../autho/Repository';

export default class loggedinUser extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            auth: true };
        }
       
componentDidMount() {
    if( isAuthenticated() )
    getUserInfo()
        .then((userDetails) => {
            this.setState({userDetails: userDetails})
        })
        .catch(err => {
            alert('You Need to Login');
            this.setState({
                auth: false
            }
        )})
    else{
    alert('User Not Authenticated');
    this.setState({auth: false})
    }
}
    render() {
        const { fname, lname, email} = this.state.userDetails
        return (
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="card">
                    <div className="cardHeader">
                        {fname} {lname}
                    </div>
                    <div className="cardMain">
                    </div>
                    <div className="cardFooter">
                        {email}
                        <br />
                    </div>
                </div>
            </div>
        )
    }
}