import React from 'react';
import { getSpecialTips, isAuthenticated } from './Repository';
import { Redirect } from 'react-router-dom';
import './Home.css'

class Home extends React.Component {
    constructor() {
        super();
        this.state = { tips: [], auth: true };
        }
       
componentDidMount() {
    if( isAuthenticated() )
    getSpecialTips()
        .then((tips) => {
            this.setState({ tips });
        })
        .catch(err => {
            alert('User Not Authenticated');
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

        return (
            <div className="profile">
                {(this.state.auth) ? '' : <Redirect to="/" />}
                <h1>Loggedin Home</h1>

            </div>
        )
    }
}
export default Home;