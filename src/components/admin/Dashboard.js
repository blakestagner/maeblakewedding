import React,  {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { getAllUsers, getTodos, completedTodo } from '../../autho/Repository';
import './dashboard.css';
import Loading from '../Loading';

export function Dashboard(props) {
    const [resType, setType] = useState('overview')
    const selected = 'calendar-category-button selected'
    const inactive = 'calendar-category-button'

    return (
        <div>
            {props.isLoggedIn ? '' : <Redirect to="/login" />}
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 calendarToolbar">
                <h1>Mae & Blake Only</h1>
                <div className="calendarBox">
                    <div className='calendarItems'>
                        <div
                            onClick={() => setType('overview')}
                            className={resType === 'overview' ? selected : inactive}>
                            Overview</div>
                    </div>
                    <div className='calendarItems'>
                        <div
                            onClick={() => setType('todo')}
                            className={resType === 'todo' ? selected : inactive}>
                            Todo</div>
                    </div>
                </div>
            </div>
            {resType === 'overview' ? 
                <Overview />
            :
                <Todo />
            }
        </div>
    )
}

export default Dashboard;

export function Overview(props) {
    const [isLoading, doneLoading] = useState(true)
    const [allUsers, setAllUsers] = useState([])
    
    useEffect(() => {
        getAllUsers()
        .then(res => {
            setAllUsers(res)
        })
        .then(() => doneLoading(false))
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

    if(isLoading) {
        return <Loading />
    }

    return (
        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-6">
            <h1>Dashboard</h1>
            <h3>Total RSVP'd: {totalCount()}</h3>
            <div className="form-container dashboard" style={{padding: '5px 50px'}}>
                    <div><b className="dash-title">RSVP'd </b>{getRSVPCount()}</div>
                    <div><b className="dash-title">Parking </b>{getParkingCount()}</div>
                    <div><b className="dash-title">Plusone </b>{getPlusoneCount()}</div>
            </div>
            <div className='dash-container'>
                {allUsers.map(users => (
                    <div className="dash-info" key={users.id}>
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
    )
}

export function Todo(props) {
    const [isLoading, doneLoading] = useState(true)
    const [ourTodos, setTodos] = useState([])

    const todoStatus = (x, y) => {
        completedTodo(x, y)
            .then(res => console.log(res))
            .then(refreshTodo)
            .catch(err => console.log(err))
    }
    const refreshTodo = () => {
        getTodos()
            .then(res => setTodos(res))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getTodos()
            .then(res => setTodos(res))
            .then(() => doneLoading(false))
            .catch(err => console.log(err))
    }, [])
    
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
    const convertTime = (time) => {
        let date = time.split('T')[0]
        let year = date.split('-')[0]
        let month = date.split('-')[1]
        let day = date.split('-')[2]

        
        return `${getMonthName(month)} ${day} ${year}`
    }
    
    if(isLoading) {
        return <Loading />
    }

    return (
        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-6">
            <h1>Todo</h1>
            <h3>Still Todo</h3>
            <div className='dash-container'>
                {ourTodos.filter(todo => todo.completed === 0).map(todo => (
                    <div key={todo.id} className="separator">
                        <div className="dash-info">
                            <p >{todo.title}</p>
                            <p><b>By: </b>{convertTime(todo.complete_by)}</p>
                            <p>{todo.description}</p>
                        </div>
                        <div className="todoBtn" onClick={() => todoStatus(1, todo.id)}>Completed</div>
                    </div>
                ))}
            </div>
            <div className="separator"></div>
            <h3>Completed</h3>
            <div className='dash-container'>
                {ourTodos.filter(todo => todo.completed === 1).map(todo => (
                    <div key={todo.id} className="separator">
                        <div className="dash-info">
                            <p >{todo.title}</p>
                            <p><b>By: </b>{convertTime(todo.complete_by)}</p>
                            <p>{todo.description}</p>
                        </div>
                        <div className="todoBtn" onClick={() => todoStatus(0, todo.id)}>Incomplete</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
