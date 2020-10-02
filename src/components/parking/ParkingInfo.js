import React from 'react';
import parking_map from '../../img/venue/PARKING MAP.pdf';
import pdf from '../../img/icons/pdf.svg';
import './parking.css';
import Loading from '../Loading';

export function ParkingInfo(props) {
    const doneLoadingRef = React.useRef()

    return (
        <div className="separator">
            <h2>Venue Parking</h2>
            {props.isLoggedIn ? 
                <h3>Parking location for prepaid parking</h3>
            : 
                <h3>The venue has a paid parking location, please log in to request pre paid parking.</h3>
            }
            <Loading ref={doneLoadingRef}/>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2708.5747011136987!2d-122.43540348392644!3d47.244464379162295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549055c990beb57d%3A0x4261ac7d4caa0b17!2sWest%20of%20the%20Waterway!5e0!3m2!1sen!2sus!4v1600445640696!5m2!1sen!2sus" 
                onLoad={() => doneLoadingRef.current.loadingStatus()}
                frameBorder="0" 
                style={{border: '0'}} 
                aria-hidden="false" 
                tabIndex="0"
                className='map-iframe'
                title="venue parking">    
            </iframe>
        </div>
    )
}

export function ParkingOther() {
    return (
        <div className="separator">
            <h2>Other Parking</h2>
            <h3>Other Parking Options</h3>
            <div className="other-parking-container">
                <div className="parking-row">
                    <img className="pdf-icon" src={pdf} alt="details"/>
                    <a href={parking_map} rel="noopener noreferrer" target="_blank">
                    <div 
                        className="button" 
                        href={parking_map} target='_blank'>Parking locations pdf</div>
                    </a>
                </div>
            </div>                 
        </div>
    )
}
