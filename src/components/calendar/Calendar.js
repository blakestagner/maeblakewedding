import React from 'react';
import { isAuthenticated, getUserInfo, calendarInfo } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import './calendar.css';
import clock from '../../img/icons/clock.svg';
import date from '../../img/icons/date.svg';
import location from '../../img/icons/location.svg';
import flag from '../../img/icons/flag.svg';
import details from '../../img/icons/details.svg';
import add from '../../img/icons/add.svg';
import remove from '../../img/icons/remove.svg';

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            calendarEvents: [],
            auth: true, 
            eventList: []
            }
        this.expandPanel = this.expandPanel.bind(this);
        }
    componentDidMount() {
        if(isAuthenticated())
        getUserInfo()
            .then((userDetails) => {
                this.setState({userDetails: userDetails})
            })
            .then( calendarInfo()   
                .then((eventList) => {
                    this.setState({eventList: eventList})
                })
                .catch(err => {
                    console.log('error')
                }) 
            )
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
    expandPanel(x, e) {
        let panel = document.getElementById(x)
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null
            e.target.src = add
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px'
            e.target.src = remove
            }
        }
    render() {
        return (
            <div className="container">
                {(this.state.auth) ? '' : <Redirect to="/" />}
                <h1>Calendar</h1>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <CalenderContainer 
                            expandPanel={this.expandPanel}
                            eventList={this.state.eventList}
                            categoryName="Events For Wedding Party"
                            wparty="n"/>
                        <CalenderContainer 
                            expandPanel={this.expandPanel}
                            eventList={this.state.eventList}
                            categoryName="Events For Wedding Party"
                            wparty="y"/>
                    </div>
                    <div className="row">
                        <CalenderContainer 
                            expandPanel={this.expandPanel}
                            eventList={this.state.eventList}
                            categoryName="Events For Wedding for the Groomsmen"
                            wparty="b"/>
                        <CalenderContainer 
                            expandPanel={this.expandPanel}
                            eventList={this.state.eventList}
                            categoryName="Events For Wedding da Bridesmaids"
                            wparty="g"/>
                    </div>
                </div>
            </div>
        )
    }
}
class CalenderContainer extends React.Component {
    render() {
        return (
            <div className="col-lg-6 col-md-6">
                <div className="card">
                    <div className="cardHeader">
                        {this.props.categoryName}
                    </div>
                    <div className="cardMain">
                        {this.props.eventList.filter(eventCat => eventCat.wparty === this.props.wparty).map((eventCat) => (
                        <div className="eventList" key={eventCat.id}>
                        <img className="icons" src={flag} alt="flag" />
                        <img src={ add } className="add" alt="plus-minus" onClick={(e) => {this.props.expandPanel(`panel-${eventCat.id}`, e)}} />
                        <p className="name eventsContent">{eventCat.name}</p>
                        <img className="icons" src={date} alt="date" />
                        <p className="date eventsContent">{eventCat.date.split('T')[0]}</p>
                            <div className="closed" id={`panel-${eventCat.id}`}>
                                <img className="timeIcon" src={clock} alt="clock" />
                                <p className="time eventsContent">{eventCat.time}</p>
                                <img className="icons" src={details} alt="details"/>
                                <p className="details eventsContent">{eventCat.details}</p>
                                <img className="locationIcon" src={location} alt="location" />
                                <p className="location eventsContent">{eventCat.location.split(',')[0]}</p>
                                <p className="locationBottom">{eventCat.location.split(',')[1]}</p>
                            </div>
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