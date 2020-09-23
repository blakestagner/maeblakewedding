import React from 'react';
import { isAuthenticated, calendarInfo, calendarPublic } from '../../autho/Repository';
import './calendar.css';
import location from '../../img/icons/location-white.svg';
import details from '../../img/icons/details-white.svg';
import add from '../../img/icons/add.svg';
import remove from '../../img/icons/remove.svg';

export function CalenderContainer(props){
    const [events, setEvents] = React.useState({
        eventList: []
    })
    React.useEffect((events) => {
        if( isAuthenticated() )
            calendarInfo()   
                .then(res => {
                    setEvents({...events, eventList: res})
                })
                .catch(err => {
                    console.log('error')
                }) 
        else {
            calendarPublic()   
                .then((eventList) => {
                    setEvents({eventList: eventList})
                })
                .catch(err => {
                    console.log('error')
                })
        }
    }, [])
    
    const expandPanel = (x, e) => {
        let panel = document.getElementById(x)
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null
            e.target.src = add
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px'
            e.target.src = remove
            }
        }
    const getMonthName = (e) => {
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
                default:  
                    return 'Null';
            }
        }
    return (
        <div>
            <h1>{props.categoryName}</h1>
            <div className="cardMain">
                {events.eventList.filter(eventCat => eventCat.wparty === props.wparty).map((eventCat) => (
                <div className="eventList" key={eventCat.id}>    
                    <div className="calendarMain">
                        <img src={ add } className="add" alt="plus-minus" onClick={(e) => {expandPanel(`panel-${eventCat.id}`, e)}} />
                        <div className="calendarIconContainer">
                            <div className="calendarTop calendarInner">
                                <p>{getMonthName(eventCat.date.split('-')[1])}</p>
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