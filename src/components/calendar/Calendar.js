import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './calendar.css';
import add from '../../img/icons/add.svg';
import remove from '../../img/icons/remove.svg';
import { CalendarContainer } from './CalendarContainer';

export function Calendar(props) {
    const [openCalendar, setCalendar] = useState('for all');

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
    
    const selected = 'calendar-category-button selected'
    const inactive = 'calendar-category-button'

    return (
        <div>
            {props.isLoggedIn ? '' : <Redirect to="/login" />} 
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 calendarToolbar">
                <h1>Calendars</h1>
                <div className="calendarBox">
                    <div className='calendarItems'>
                        <div
                            onClick={() => setCalendar('for all')}
                            className={openCalendar === 'for all' ? selected : inactive}>
                            For All</div>
                    </div>
                    <div className="calendarItems">
                        <div
                            onClick={() => setCalendar('wedding party')} 
                            className={openCalendar === 'wedding party' ? selected : inactive}>
                            Wedding Party</div>
                    </div>
                    {(props.userDetails.wparty === 'b' || props.userDetails.wparty === 'a') ?
                    <div className="calendarItems">
                        <div
                            onClick={() => setCalendar('groom')} 
                            className={openCalendar === 'groom' ? selected : inactive}>
                            Groomsmen</div>
                    </div>
                        : null
                    }
                    {(props.userDetails.wparty === 'g' || props.userDetails.wparty === 'a') ?
                    <div className="calendarItems">
                        <div
                            onClick={() => setCalendar('bride')} 
                            className={openCalendar === 'bride' ? selected : inactive}>
                            Bridesmaids</div>
                    </div>
                        : null
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-7 col-md-6 col-lg-5 col-lg-push-1">
                {openCalendar === 'for all' &&
                <div>
                    <CalendarContainer
                        expandPanel={expandPanel}
                        categoryName="Events For All"
                        wparty="n"
                        />
                </div>
                }
                {openCalendar === 'wedding party' &&
                    <CalendarContainer 
                        expandPanel={expandPanel}
                        categoryName="Events For Wedding Party"
                        wparty="y"/>
                }
                {openCalendar === 'groom' &&
                    <CalendarContainer 
                        expandPanel={expandPanel}
                        categoryName="Events For the Groomsmen"
                        wparty="b"/>
                }
                {openCalendar === 'bride' &&
                    <CalendarContainer 
                        expandPanel={expandPanel}
                        categoryName="Events For the Bridesmaids"
                        wparty="g"/> 
                }    
                </div>
            </div>
        </div>
    )
    
}