import React from 'react';
import { isAuthenticated, getUserInfo, calendarInfo } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import './calendar.css';
import location from '../../img/icons/location-white.svg';
import details from '../../img/icons/details-white.svg';
import add from '../../img/icons/add.svg';
import remove from '../../img/icons/remove.svg';
import graphic from '../../img/pics/Mae.JPG';

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            calendarEvents: [],
            auth: true, 
            eventList: [],
            isForAllOpen: true, 
            isWeddingPartyOpen: false,
            isGroomOpen: false,
            isBrideOpen: false,
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
    showForAll() {
        this.setState({isForAllOpen: true, isWeddingPartyOpen: false, isGroomOpen: false, isBrideOpen: false});
    }
    showParty() {
        this.setState({isForAllOpen: false, isWeddingPartyOpen: true, isGroomOpen: false, isBrideOpen: false});
    }
    showGroom() {
        this.setState({isForAllOpen: false, isWeddingPartyOpen: false, isGroomOpen: true, isBrideOpen: false});
    }
    showBride() {
        this.setState({isForAllOpen: false, isWeddingPartyOpen: false, isGroomOpen: false, isBrideOpen: true});
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
            <div className="row-no-gutter">
                {(this.state.auth) ? '' : <Redirect to="/" />} 
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 calendarToolbar">
                    <h1>Calendars</h1>
                    <div className="calendarBox">
                        <div className="calendarItems" onClick={this.showForAll.bind(this)}>
                            For All
                        </div>
                        <div className="calendarItems" onClick={this.showParty.bind(this)}>
                            Wedding Party
                        </div>
                        {(this.state.userDetails.wparty == 'b' || this.state.userDetails.wparty == 'a') ?
                        <div className="calendarItems" onClick={this.showGroom.bind(this)}>
                            Groomsmen
                        </div>
                            : null
                        }
                        {(this.state.userDetails.wpart == 'g' || this.state.userDetails.wparty == 'a') ?
                        <div className="calendarItems" onClick={this.showBride.bind(this)}>
                            Bridesmaids
                        </div>
                            : null
                        }
                    </div>
                </div>
                    <div className="row">
                    {this.state.isForAllOpen &&
                        <CalenderContainer 
                            expandPanel={this.expandPanel}
                            eventList={this.state.eventList}
                            categoryName="Events For All"
                            wparty="n"/>
                    }
                    {this.state.isWeddingPartyOpen &&
                        <CalenderContainer 
                            expandPanel={this.expandPanel}
                            eventList={this.state.eventList}
                            categoryName="Events For Wedding Party"
                            wparty="y"/>
                    }
                    {this.state.isGroomOpen &&
                        <CalenderContainer 
                            expandPanel={this.expandPanel}
                            eventList={this.state.eventList}
                            categoryName="Events For Wedding for the Groomsmen"
                            wparty="b"/>
                    }
                    {this.state.isBrideOpen &&
                        <CalenderContainer 
                            expandPanel={this.expandPanel}
                            eventList={this.state.eventList}
                            categoryName="Events For Wedding da Bridesmaids"
                            wparty="g"/> 
                    }    
                </div>
            </div>
        )
    }
}
class CalenderContainer extends React.Component {
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
            <div className="col-xs-12 col-sm-7 col-md-6 col-lg-5 col-lg-push-1">
                <h1>{this.props.categoryName}</h1>
                <div className="cardMain">
                    {this.props.eventList.filter(eventCat => eventCat.wparty == this.props.wparty).map((eventCat) => (
                    <div className="eventList" key={eventCat.id}>    
                        <div className="calendarMain">
                            <img src={ add } className="add" alt="plus-minus" onClick={(e) => {this.props.expandPanel(`panel-${eventCat.id}`, e)}} />
                            <div className="calendarIconContainer">
                                <div className="calendarTop calendarInner">
                                    <p>{this.getMonthName(eventCat.date.split('-')[1])}</p>
                                </div>
                                <div className="calendarBottom calendarInner">
                                    <p>{eventCat.date.split('-')[2].split('T')[0]}</p>
                                </div>
                            </div>
                            <p className="name eventsContent">{eventCat.name}</p>
                            <p className="time eventsContent">{eventCat.time}</p>
                        </div>
                        <div className="closed" id={`panel-${eventCat.id}`}>
                            <div className="row">
                                <img className="detailsIcon" src={details} alt="details"/>
                                <p className="details eventsContent">{eventCat.details}</p>
                            </div>
                            <div className="row">
                                <img className="locationIcon" src={location} alt="location" />
                                <p className="location eventsContent">{eventCat.location.split(',')[0]}</p>
                                <p className="locationBottom">{eventCat.location.split(',')[1]}</p>
                            </div>
                        </div>
                    </div>
                    ))
                    }
                </div>
            </div>
        )
    }
}