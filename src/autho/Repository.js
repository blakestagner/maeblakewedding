import axios from 'axios';
const BASE_URL = 'https://api.blakestagner.com';
//const BASE_URL = 'http://localhost:3050';


export function login (data) {
    return axios.post(`${BASE_URL}/api/login`, { 
        email: data.email, 
        password: data.password 
    })
    .then(response => {
        localStorage.setItem('x-access-token', response.data.token);
        return response.data
    })
    .catch((err) => Promise.reject(err.response.data));
}

export function register (data) {
    const regMsg = document.getElementById('registrationMessage')
    return axios.post(`${BASE_URL}/api/register`, {
        fname: data.fname, 
        lname: data.lname, 
        email: data.email, 
        password: data.password,
        wparty: data.wparty
    })
    .then((res) => {
        regMsg.innerHTML = res.data
    })
    .catch((err) => {
        regMsg.innerHTML = err.response.data
    })
}


export function isAuthenticated() {
    return localStorage.getItem('x-access-token') 
    
}

export function getUserInfo() {
    return axios.get(`${BASE_URL}/user/data`, { 
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
    }
//Calender
export function calendarInfo() {
    return axios.get(`${BASE_URL}/api/calendar`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
        })
        .then(res => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}
export function calendarPublic() {
    return axios.get(`${BASE_URL}/api/calendarPublic`)
        .then(res => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}
//Parking
export function getParking () {
    return axios.get(`${BASE_URL}/api/getParkingData`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }

export function updateParking (data) {
    return axios.post(`${BASE_URL}/api/updateParking`, {
        'parking': data, 
        'x-access-token': localStorage.getItem('x-access-token')
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject('Request Not Authorized!'))
}
//RSVP
export function getRSVP () {
    return axios.get(`${BASE_URL}/api/getRSVP`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }

export function updateRSVP (data) {
    return axios.post(`${BASE_URL}/api/updateRSVP`, {
        'RSVP': data, 
        'x-access-token': localStorage.getItem('x-access-token')
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject('Request Not Authorized!'))
}
//Plusone
export function checkPlusone () {
    return axios.get(`${BASE_URL}/api/checkPlusone`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }

export function getPlusone () {
    return axios.get(`${BASE_URL}/api/getPlusone`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }

export function updatePlusone (data) {
    return axios.post(`${BASE_URL}/api/updatePlusone`, {
        'plusone': data, 
        'x-access-token': localStorage.getItem('x-access-token')
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject('Request Not Authorized!'))
}
//Couple 
export function coupleId () {
    return axios.get(`${BASE_URL}/api/getCoupleId`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }
export function getCoupleInfo (data) {
    return axios.get(`${BASE_URL}/api/getCoupleInfo`, {
        params: { 'id': data, 'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }
export function getCoupleRSVP (data) {
    return axios.get(`${BASE_URL}/api/getCoupleRSVP`, {
        params: { 'id': data,'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }
export function updateCoupleRSVP (x, y) {
    return axios.post(`${BASE_URL}/api/updateCoupleRSVP`, {
        'RSVP': x, 
        'id': y,
        'x-access-token': localStorage.getItem('x-access-token')
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject('Request Not Authorized!'))
    }
export function getAllUsers (data) {
    return axios.get(`${BASE_URL}/api/getAllUsers`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }
export function getTodos (data) {
    return axios.get(`${BASE_URL}/api/getTodos`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')}
        })
        .then((res) => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    }
export function completedTodo (x, y) {
    return axios.post(`${BASE_URL}/api/completedTodo`, {
        'completed': x, 
        'id': y,
        'x-access-token': localStorage.getItem('x-access-token')
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject('Request Not Authorized!'))
}