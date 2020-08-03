import React from 'react';
import { isAuthenticated, getUserInfo, calendarInfo } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import './calendar.css';
import clock from '../../img/icons/clock.svg';
import date from '../../img/icons/date.svg';
import location from '../../img/icons/location.svg';
import flag from '../../img/icons/flag.svg';
import details from '../../img/icons/details.svg';

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            calendarEvents: [],
            auth: true };

        }
    examp() {
        console.log('hello')
    }
    componentDidMount() {
        if(isAuthenticated())
        getUserInfo()
            .then((userDetails) => {
                this.setState({userDetails: userDetails})
            })
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
    render() {
        return (
            <div className="container">
                {(this.state.auth) ? '' : <Redirect to="/" />}
                <h1>Calendar</h1>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <CalendarForAll />
                        <CalendarForParty />
                    </div>
                    <div className="row">
                        <CalendarForBoys />
                        <CalendarForGirls />
                    </div>
                </div>
            </div>
        )
    }
}

class CalendarForAll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            forAll: []
        }
    }
    componentDidMount() {
        if(isAuthenticated())
        calendarInfo()
            .then((forAll) => {
                this.setState({forAll})
            })
            .catch(err => {
                console.log('error')
            })
    }
    render() {
        return (
            <div className="col-lg-4 col-md-6">
                <div className="card">
                    <div className="cardHeader">
                        Events For All
                    </div>
                    <div className="cardMain">
                        {this.state.forAll.filter(forAll => forAll.wparty === 'n').map((forAll) => (
                            <div className="eventList" key={forAll.id}>
                                <img className="icons" src={flag} alt="flag" /><p className="name eventsContent">{forAll.name}</p>

                                <img className="icons" src={date} alt="date" /> <p className="date eventsContent">{forAll.date.split('T')[0]}</p>

                                <img className="icons" src={clock} alt="clock" /><p className="time eventsContent">{forAll.time}</p>

                                <img className="locationIcon" src={location} alt="location" /><p className="location eventsContent">{forAll.location.split(',')[0]}</p>
                                <p className="locationBottom">{forAll.location.split(',')[1]}</p>

                                <img className="icons" src={details} alt="details"/><p className="details eventsContent">{forAll.details}</p>
                            </div>
                        ))
                        }
                    </div>
                    <div className="cardFooter">

                    </div>
                </div>
            </div>
        )
    }
}
class CalendarForParty extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            forParty: []
        }
    }
    componentDidMount() {
        if(isAuthenticated())
        calendarInfo()
            .then((forParty) => {
                this.setState({forParty})
            })
            .catch(err => {
                console.log('error')
            })
    }
    render() {
        return (
            <div className="col-lg-6 col-md-6">
                <div className="card">
                    <div className="cardHeader">
                        Events For Wedding Party
                    </div>
                    <div className="cardMain">
                        {this.state.forParty.filter(forParty => forParty.wparty === 'y').map((forParty) => (
                            <div key={forParty.id}>
                                <p>{forParty.name}</p>
                                <p>{forParty.date}</p>
                                <p>{forParty.time}</p>
                                <p>{forParty.details}</p>
                            </div>
                        ))
                        }
                    </div>
                    <div className="cardFooter">

                    </div>
                </div>
            </div>
        )
    }
}
class CalendarForBoys extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            forBoys: []
        }
    }
    componentDidMount() {
        if(isAuthenticated())
        calendarInfo()
            .then((forBoys) => {
                this.setState({forBoys})
            })
            .catch(err => {
                console.log('error')
            })
    }
    render() {
        return (
            <div className="col-lg-6 col-md-6">
                <div className="card">
                    <div className="cardHeader">
                        Events For Wedding for the Groomsmen
                    </div>
                    <div className="cardMain">
                        {this.state.forBoys.filter(forBoys => forBoys.wparty === 'b').map((forBoys) => (
                            <div key={forBoys.id}>
                                <p>{forBoys.name}</p>
                                <p>{forBoys.date}</p>
                                <p>{forBoys.time}</p>
                            </div>
                        ))
                        }
                    </div>
                    <div className="cardFooter">

                    </div>
                </div>
            </div>
        )
    }
}
class CalendarForGirls extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            forGirls: []
        }
    }
    componentDidMount() {
        if(isAuthenticated())
        calendarInfo()
            .then((forGirls) => {
                this.setState({forGirls})
            })
            .catch(err => {
                console.log('error')
            })
    }
    render() {
        return (
            <div className="col-lg-6 col-md-6">
                <div className="card">
                    <div className="cardHeader">
                        Events For Wedding da Bridesmaids
                    </div>
                    <div className="cardMain">
                        {this.state.forGirls.filter(forGirls => forGirls.wparty === 'g').map((forGirls) => (
                            <div key={forGirls.id}>
                                <p>{forGirls.name}</p>
                                <p>{forGirls.date}</p>
                                <p>{forGirls.time}</p>
                            </div>
                        ))
                        }
                    </div>
                    <div className="cardFooter">

                    </div>
                </div>
            </div>
        )
    }
}