import React,  {useState, useEffect} from 'react';
import { getAllUsers } from '../../autho/Repository'

export function Dashboard(props) {
const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        getAllUsers()
        .then(res => {
            setAllUsers(res)
        })
        .catch(err => console.log(err))

    }, [])

    const totalCount = () => {
        let total = 0;
        for (let i = 0; i < allUsers.length; i++) {
            if(allUsers[i].RSVP === 'Yes') total++
            if (allUsers[i].plusone === 'Yes') total++
        }
        return total;
    }

    const getRSVPCount = () => {
        let rsvpCount = 0;
        let rsvpNo = 0;
        for(let i = 0; i < allUsers.length; i++) {
            allUsers[i].RSVP === 'Yes' ? rsvpCount++ : rsvpNo++
        }
        return <div className="display-flex">
                    <span className="dash-count-icon" style={{backgroundColor: '#1d761d'}}>{rsvpCount}</span>
                    <span className="dash-count-icon" style={{backgroundColor: 'red'}}>{rsvpNo}</span>
                </div>
    }
    const getParkingCount = () => {
        let parkingCount = 0;
        let parkingNo = 0;
        for(let i = 0; i < allUsers.length; i++) {
            allUsers[i].parking === 'Yes' ? parkingCount++ : parkingNo++
        }
        return <div className="display-flex">
                    <span className="dash-count-icon" style={{backgroundColor: '#1d761d'}}>{parkingCount}</span>
                    <span className="dash-count-icon" style={{backgroundColor: 'red'}}>{parkingNo}</span>
                </div>
    }
    const getPlusoneCount = () => {
        let plusoneCount = 0;
        let plusoneNo = 0;
        for(let i = 0; i < allUsers.length; i++) {
            allUsers[i].plusone === 'Yes' ? plusoneCount++ : plusoneNo++
        }
        return <div className="display-flex">
                    <span className="dash-count-icon" style={{backgroundColor: '#1d761d'}}>{plusoneCount}</span>
                    <span className="dash-count-icon" style={{backgroundColor: 'red'}}>{plusoneNo}</span>
                </div>
    }


    return (
        <div>
            <DashboardMenu />
            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-6">
            <h1>Dashboard</h1>
            <h3>Total RSVP'd: {totalCount()}</h3>
            <div className="form-container dashboard" style={{padding: '5px 50px'}}>
                    <div><b className="dash-title">RSVP'd </b>{getRSVPCount()}</div>
                    <div><b className="dash-title">Parking </b>{getParkingCount()}</div>
                    <div><b className="dash-title">Plusone </b>{getPlusoneCount()}</div>
            </div>
            <div className='users-container'>
                {allUsers.map(users => (
                    <div className="user-info" key={users.id}>
                        <p>{users.fname} {users.lname}</p>
                        <p><b>RSVP:</b> {users.RSVP}</p>
                        <p><b>Parking:</b> {users.parking}</p>
                        {users.hasPlusone === 'Yes' ?
                            <p><b>Plusone:</b> {users.plusone}</p>
                            : 
                            ''}
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default Dashboard;

export function DashboardMenu(props) {
    const [resType, setType] = useState('overview')


    const selected = 'calendar-category-button selected'
    const inactive = 'calendar-category-button'
    return (
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 calendarToolbar">
                <h1>Response Types</h1>
                <div className="calendarBox">
                    <div className='calendarItems'>
                        <div
                            onClick={() => setType('overview')}
                            className={resType === 'overview' ? selected : inactive}>
                            Overview</div>
                    </div>
                    <div className='calendarItems'>
                        <div
                            onClick={() => setType('rsvp')}
                            className={resType === 'rsvp' ? selected : inactive}>
                            RSVP</div>
                    </div>
                    <div className='calendarItems'>
                        <div
                            onClick={() => setType('parking')}
                            className={resType === 'parking' ? selected : inactive}>
                            Parking</div>
                    </div>
                </div>
            </div>
    )
}
