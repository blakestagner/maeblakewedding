import React from 'react';
import { Link } from 'react-router-dom';
import './toolbar.css';
import { isAuthenticated} from '../autho/Repository';
import menuBlack from './img/menu-black.svg';
import menuWhite from './img/menu-white.svg';

export default class Toolbar extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            menuIcon: menuWhite
        }
        this.handleClickBeyondSidebar = this.handleClickBeyondSidebar.bind(this)
        this.mobileMenuToggle = this.mobileMenuToggle.bind(this)
    }
    logOut(){
        localStorage.removeItem('x-access-token');
        }
    mobileMenuToggle() {
        const mobileNav = document.querySelector('#mobileMenu')
        const contentElement = document.querySelector('#main')
        if (mobileNav.classList == 'mmClosed') {
            mobileNav.classList = 'mmOpen'
            this.handleClickBeyondSidebar(contentElement, mobileNav.classList)
        } else mobileNav.classList = 'mmClosed'
            this.handleClickBeyondSidebar(contentElement, mobileNav.classList)
    }  
    handleClickBeyondSidebar(x, y) {
        if(y == 'mmClosed') {
            x.removeEventListener("click", this.mobileMenuToggle)
        } else x.addEventListener('click', this.mobileMenuToggle)
    }
    render() {
        window.onscroll = () => {
            const nav = document.querySelector('#mainNav');

            if(window.scrollY <= 10) {
                nav.className = 'navBar'
                this.setState({menuIcon: menuWhite})
            }
            else {
                nav.className = 'navBar scrollBar';
                this.setState({menuIcon: menuBlack})
                }
            };  
        return (
        <div className="navBar" id="mainNav">
                <div className='navBarContainer'>
                    <div className='navBarTtitle'>
                        <h1><Link to="/">Mae & Blake</Link></h1>
                    </div>
                    <ul id="mainMenuList">
                        {
                            ( isAuthenticated() ) ? 
                            <li className="menuList">
                                <Link to="/calendar">Calendar</Link>
                            </li>
                            :  ''
                        }
                        {(isAuthenticated() ) ?
                            <li className="menuList">
                                <Link to="/parking">Parking</Link>
                            </li> 
                            : ''
                        }
                        {(isAuthenticated() ) ? 
                            <li className="menuList">
                                <Link to="/rsvp">RSVP</Link>
                            </li>
                            : ''
                        }
                        {( isAuthenticated() ) ? (   
                            <li className="menuList">
                                <Link className="navList" to="/profile" >Profile</Link>
                            </li>) : ''
                        }
                        {( isAuthenticated() ) ? (   
                            <li className="menuList" onClick={this.logOut}>
                                <a href="/">Log out</a> 
                            </li>) : 
                        ( 
                            <li className="menuList">
                                <Link to="/login">Log in</Link>
                            </li>
                        )
                        }
                        <li>
                            <img id='navManuIcon' alt="menu" src={ this.state.menuIcon } onClick={this.mobileMenuToggle} />
                        </li>
                    </ul>
                </div>
                <MobileMenu onClick={this.mobileMenuToggle}/>
            </div>
        )
    }
} 
class MobileMenu extends React.Component {
    render() {
        return (
            <div id="mobileMenu" className="mmClosed">
                <ul className="mobileNavBarList" onClick={this.props.onClick}>
                    {
                        ( isAuthenticated() ) ? 
                        <li>
                            <Link to="/calendar" >Calendar</Link>
                        </li>
                        :  ''
                    }
                    {(isAuthenticated() ) ?
                        <li>
                            <Link to="/parking">Parking</Link>
                        </li> 
                        : ''
                    }
                    {(isAuthenticated() ) ? 
                        <li>
                            <Link to="/rsvp">RSVP</Link>
                        </li>
                        : ''
                    }
                    {( isAuthenticated() ) ? (   
                        <li>
                            <Link className="navList" to="/profile" >Profile</Link>
                        </li>) : 
                    ( 
                        <li>
                            <Link className="navList" to="/register" >Register</Link>
                        </li>
                    )
                    }
                    {( isAuthenticated() ) ? (   
                        <li onClick={this.logOut}>
                            <a href="/">Log out</a> 
                        </li>) : 
                    ( 
                        <li>
                            <Link to="/register">Log in</Link>
                        </li>
                    )
                    }
                </ul>
            </div>
        )
    }
}
