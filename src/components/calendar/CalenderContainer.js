import React from 'react';
import { isAuthenticated, getUserInfo, calendarInfo, calendarPublic } from '../../autho/Repository';
import './calendar.css';
import clock from '../../img/icons/clock-white.svg';
import date from '../../img/icons/date.svg';
import location from '../../img/icons/location-white.svg';
import flag from '../../img/icons/flag.svg';
import details from '../../img/icons/details-white.svg';
import add from '../../img/icons/add.svg';
import remove from '../../img/icons/remove.svg';

export default class CalenderContainer extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            calendarEvents: [],
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
            calendarPublic()   
                .then((eventList) => {
                    this.setState({eventList: eventList})
                })
                .catch(err => {
                    console.log('error')
                })
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
        getMonthName(e) {
            switch(e) {
                case '01':
                return 'Jan';
                case '02':
                return 'Feb';
                case '03':
                return 'Mar';
                case '04':
                return 'Apr';
                case '05':
                return 'May';
                case '06':
                return 'Jun';
                case '07':
                return 'Jul';
                case '08':
                return 'Aug';
                case '09':
                return 'Sept';
                case '10':
                return 'Oct';
                case '11':
                return 'Nov';
                case '12':
                return 'Dec';
            }
        }
    render() {
        return (
            <div>
                <div className="cardMain">
                    {this.state.eventList.filter(eventCat => eventCat.wparty == this.props.wparty).map((eventCat) => (
                    <div className="eventList" key={eventCat.id}>
                    <img className="icons" src={flag} alt="flag" />
                    <img src={ add } className="add" alt="plus-minus" onClick={(e) => {this.expandPanel(`panel-${eventCat.id}`, e)}} />
                    <p className="name eventsContent">{eventCat.name}</p>
                    <img className="icons" src={date} alt="date" />
                    <p className="date eventsContent">{eventCat.date.split('T')[0]}</p>
                    <div className="calendarIconContainer">
                        <div className="calendarTop calendarInner">
                            <p>{this.getMonthName(eventCat.date.split('-')[1])}</p>
                        </div>
                        <div className="calendarBottom calendarInner">
                            <p>{eventCat.date.split('-')[2].split('T')[0]}</p>
                        </div>
                    </div>
                        <div className="closed" id={`panel-${eventCat.id}`}>
                            <img className="timeIcon" src={clock} alt="clock" />
                            <p className="time eventsContent">{eventCat.time}</p>
                            <img className="detailsIcon" src={details} alt="details"/>
                            <p className="details eventsContent">{eventCat.details}</p>
                            <img className="locationIcon" src={location} alt="location" />
                            <p className="location eventsContent">{eventCat.location.split(',')[0]}</p>
                            <p className="locationBottom">{eventCat.location.split(',')[1]}</p>
                        </div>
                </div>
                    ))
                    }
                </div>
            </div>
        )
    }
}