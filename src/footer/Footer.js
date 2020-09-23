import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <svg viewBox="0 0 1200 100" style={{marginRight: '-10px', marginLeft: '-10px'}}>
                <path fill="#fff" fill-opacity="1" d="M 0 0 Q 50 0 100 50 Q 150 100 250 50 Q 350 0 450 50 Q 550 100 800 50 Q 1000 0 1200 0 "
                /*d="M 0 50 C 50 50 50 100 100 100 C 150 100 150 50 200 50 C 250 50 250 100 300 100 C 350 100 350 50 400 50 C 450 50 450 100 500 100 C 550 100 550 50 600 50 C 650 50 650 100 700 100 C 750 100 750 50 800 50 C 850 50 850 100 900 100 C 950 100 950 50 1000 50 C 1050 50 1050 100 1100 100 C 1150 100 1150 50 1200 50"*/></path>
            </svg>
                <h1>Sunday, the 16th of August 2021</h1>
                <h2>5:00 pm</h2>
                <h2>Reception to Follow</h2>
                <p>WEST OF THE WATERWAY</p>
                <p>1901 DOCK ST, TACOMA, WA</p>
                <p>98402</p>
        </footer>
    )
}
export default Footer;