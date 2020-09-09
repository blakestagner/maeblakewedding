import React from 'react';
import RSVP from './RSVP';
import '../../home/home.css'
import graphic from '../../img/pics/Mae.JPG';
import { isAuthenticated } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading'

export default class RSVPHome extends React.Component {
    constructor() {
        super();
        this.state = { 
            auth: true };
        }
componentDidMount() {
    if( !isAuthenticated() ) {
        alert('User Not Authenticated');
        this.setState({auth: false})
        this.props.loadStatus()
    }
}
    render() {
        if (this.props.loading === 0) {
            return <Loading />
        }
        return (
            <div className="row-no-gutter">
                {(this.state.auth) ? '' : <Redirect to="/" />}
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
                    <img src={graphic} className="imgLeft firstImg" alt="Mae and Blake"/>
                    <div className="imgLeftMobile firstImg"></div>
                </div>
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                    <div className="row">
                        <div className="homeText">
                            <RSVP userDetails={this.props.userDetails}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}