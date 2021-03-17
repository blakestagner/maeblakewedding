import React from 'react';
import './hero.css';
import { isAuthenticated} from '../autho/Repository';

export default function Hero() {

    return (
        <div className="heroContainer">
            {
                (isAuthenticated() ) ? 
                    (<LoggedinHero />)
                        :
                    (<LandingHero />)
            }
        </div>
        )
    
}

function LandingHero() {
    return (
        <div className="heroImg">
            <div className="heroText">
            </div>
        </div>
    )
}
function LoggedinHero() {
        return (
            <div className="loggedinImg">
                <div className="heroText">
                </div>
            </div>
        )
}