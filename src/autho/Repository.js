import axios from 'axios';
const BASE_URL = 'http://localhost:3100';

export function getRegularTips () {
 return axios.get(`${BASE_URL}/api/tips/regular`)
 .then(response => response.data);
 }

export function getSpecialTips () {
 return axios.get(`${BASE_URL}/api/tips/special`, { 
     params: { 'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(response => response.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
 }

export function login (data) {
    const lgnMsg = document.getElementById('loginMessage')
    return axios.post(`${BASE_URL}/api/login`, { 
        email: data.email, 
        password: data.password 
    })
    .then(response => {
        localStorage.setItem('x-access-token', response.data.token);
        localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
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
       .then(response => response.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
    }

export function calendarInfo() {
    return axios.get(`${BASE_URL}/api/calendar`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
        })
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

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