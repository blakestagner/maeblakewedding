import React, {useState, useEffect} from 'react';
import { isAuthenticated, getUserInfo } from '../../autho/Repository';
import { Redirect } from 'react-router-dom';
import './calendar.css';
import add from '../../img/icons/add.svg';
import remove from '../../img/icons/remove.svg';
import { CalenderContainer } from './CalenderContainer' 

export function Calendar(props) {
    const [userDetails, setUserDetails] = useState([]);
    const [openCalendar, setCalendar] = useState('for all');
    const [authenticated, setAuthenticated] = useState(true);

    useEffect(() => {
        if(isAuthenticated())
        getUserInfo()
            .then((res) => {
                setUserDetails(res)
            })
            .catch(err => {
                alert('You Need to Login to view this page');
                setUserDetails({
                    auth: false
                })
            })
        else {
            alert('User Not Authenticated');
            setAuthenticated(false)
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
    const test = () => {
        console.log('done laoding')
    }
    const selected = 'calendar-category-button selected'
    const inactive = 'calendar-category-button'
    return (
        <div>
            {authenticated ? '' : <Redirect to="/" />} 
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
                    {(userDetails.wparty === 'b' || userDetails.wparty === 'a') ?
                    <div className="calendarItems">
                        <div
                            onClick={() => setCalendar('groom')} 
                            className={openCalendar === 'groom' ? selected : inactive}>
                            Groomsmen</div>
                    </div>
                        : null
                    }
                    {(userDetails.wpart === 'g' || userDetails.wparty === 'a') ?
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
                    <CalenderContainer
                        onLoad={() => test()} 
                        expandPanel={expandPanel}
                        categoryName="Events For All"
                        wparty="n"/>
                }
                {openCalendar === 'wedding party' &&
                    <CalenderContainer 
                        expandPanel={expandPanel}
                        categoryName="Events For Wedding Party"
                        wparty="y"/>
                }
                {openCalendar === 'groom' &&
                    <CalenderContainer 
                        expandPanel={expandPanel}
                        categoryName="Events For Wedding for the Groomsmen"
                        wparty="b"/>
                }
                {openCalendar === 'bride' &&
                    <CalenderContainer 
                        expandPanel={expandPanel}
                        categoryName="Events For Wedding da Bridesmaids"
                        wparty="g"/> 
                }    
                </div>
            </div>
        </div>
    )
    
}