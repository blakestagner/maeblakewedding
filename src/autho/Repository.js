import axios from 'axios';
const BASE_URL = '73.109.125.191:3050';
//const BASE_URL = 'http://localhost:3050';


export function login (data) {
    const lgnMsg = document.getElementById('loginMessage')
    return axios.post(`${BASE_URL}/api/login`, { 
        email: data.email, 
        password: data.password 
    })
    .then(response => {
        localStorage.setItem('x-access-token', response.data.token);
        localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 10000);
        return response.data
    })
    .catch((err) => Promise.reject(
        lgnMsg.innerHTML = err.response.data
    ));
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
    && localStorage.getItem('x-access-token-expiration') > Date.now()
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
