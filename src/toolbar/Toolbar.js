import React from 'react';
import { Link } from 'react-router-dom';
import './toolbar.css';
import menuBlack from './img/menu-black.svg';
import menuWhite from './img/menu-white.svg';

export default function Toolbar(props) { 
    const [menuIcon, setMenuIcon] = React.useState(menuWhite)

    const logOut = () => {
        localStorage.removeItem('x-access-token');
    }

    const mobileMenuToggle = () => {
        const mobileNav = document.querySelector('#mobileMenu')
        const contentElement = document.querySelector('#root')
        if (mobileNav.classList.contains('mmClosed')) {
            handleClickBeyondSidebar(contentElement, mobileNav)
            mobileNav.classList = 'mmOpen'
        } else { 
            handleClickBeyondSidebar(contentElement, mobileNav) 
            mobileNav.classList = 'mmClosed'
        }
    }  
    const handleClickBeyondSidebar = (x, y) => {
        const child = document.querySelector('#mobileNavBarList').childNodes
        if(y.classList.value === 'mmOpen') {
            x.removeEventListener("click", mobileMenuToggle)
            for (let i = 0; i < child.length; i++) {
                child[i].removeEventListener("click", closeMobileMenu)
            }
        } else {
            x.addEventListener('click', mobileMenuToggle)
            for (let i = 0; i < child.length; i++) {
                child[i].addEventListener("click", closeMobileMenu)
            }
        }
    }
    const closeMobileMenu = () => {
        document.querySelector('#mobileMenu').classList = 'mmClosed'
    }
   
    window.onscroll = () => {
        const nav = document.querySelector('#mainNav');

        if(window.scrollY <= 10) {
            nav.className = 'navBar'
            setMenuIcon(menuWhite)
        }
        else {
            nav.className = 'navBar scrollBar';
            setMenuIcon(menuBlack)
            }
        };  

    return (
    <div className="navBar" id="mainNav">
        <MobileMenu 
            userDetails={props.userDetails}
            onClick={mobileMenuToggle}
            isLoggedIn={props.isLoggedIn}/>
            <div className='navBarContainer'>
                <div className='navBarTitle'>
                    <h1><Link to="/">Mae & Blake</Link></h1>
                </div>
                {props.isLoggedIn ?
                    <ul id="mainMenuList">
                        {props.isLoggedIn  && props.userDetails.id === 1  ?
                            <li className="menuList">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            : ''
                        }
                        <li className="menuList">
                            <Link to="/home">Responses</Link>
                        </li> 
                        <li className="menuList">
                            <Link to="/calendar">Calendar</Link>
                        </li>
                        <li className="menuList">
                            <Link to="/parking">Parking</Link>
                        </li>
                        <li className="menuList">
                            <Link to="/rsvp">RSVP</Link>
                        </li>
                        <li className="menuList" onClick={logOut}>
                            <a href="/">Log out</a>
                        </li>
                        <li>
                            <img id='navManuIcon' alt="menu" src={ menuIcon } onClick={mobileMenuToggle} />
                        </li>
                    </ul>
                    
                    : 
                    <ul id="mainMenuList">
                        <li className="menuList">
                            <Link to="/login">Log in</Link>
                        </li>
                        <li>
                            <img id='navManuIcon' alt="menu" src={ menuIcon } onClick={mobileMenuToggle} />
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
    
}
export function MobileMenu(props) {
    const logOut = () => {
        localStorage.removeItem('x-access-token');
        }

        return (
            <div id="mobileMenu" className="mmClosed">
                
            { props.isLoggedIn  ?
                <ul className="mobileNavBarList" id="mobileNavBarList" onClick={props.onClick}>
                    { props.userDetails.id === 1  ?
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        : ''
                    }
                    <li>
                        <Link to="/home">Responses</Link>
                    </li> 
                    <li>
                        <Link to="/calendar" >Calendar</Link>
                    </li>
                    <li>
                        <Link to="/parking">Parking</Link>
                    </li>
                    <li>
                        <Link to="/rsvp">RSVP</Link>
                    </li>
                    <li onClick={logOut}>
                        <a href="/">Log out</a> 
                    </li>
                </ul>
                : 
                <ul className="mobileNavBarList" id="mobileNavBarList" onClick={props.onClick}>
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                </ul>
                }
            </div>
        )
    
}
