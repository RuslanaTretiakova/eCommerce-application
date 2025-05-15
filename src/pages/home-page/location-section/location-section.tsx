import type React from "react"
import wroclaw from '../../../assets/img/wroclaw.png'
import poznan from '../../../assets/img/poznan.png'
import cambridge from '../../../assets/img/cambridge.png'
import './location-section.scss'

const LocationSection: React.FC<{}> = () => {
    return <section className="locations-section">
        <h2 className="section-title">Our locations:</h2>
        <div className="locations">
        <div className="location-block location-wroclaw">
            <div className="text-container">
                <p className="city-title">WROCLAW</p>
            </div>
            {/* <img src={wroclaw} alt="wroclaw" />
            <h2>Wroclaw</h2>
            <p></p> */}
        </div>
        <div className="location-block location-poznan">
        <div className="text-container">
            <p className="city-title">POZNAN</p>
        </div>
            {/* <img src={poznan} alt="poznan" />
            <h2>Poznan</h2> */}
        </div>
        <div className="location-block location-cambridge">
        <div className="text-container">
            <p className="city-title">CAMBRIDGE</p>
        </div>
            {/* <img src={cambridge} alt="cambridge" />
            <h2>Cambridge</h2> */}
        </div>
        </div>
        
    </section>
}

export default LocationSection