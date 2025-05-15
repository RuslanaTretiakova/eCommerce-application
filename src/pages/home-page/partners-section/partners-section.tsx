import type React from "react";
import './partners-section.scss'
import bianchi from'../../../assets/img/bianchi-logo-64.png'
import winora from '../../../assets/img/winora-Group-logo-64.png'

const PartnersSection: React.FC<{}> = () => {
    return <section className="parnters-section">
        <h2 className="section-title">Our brands:</h2>
        <div className="brands">
            <div className="brand-box brand-box__bianchi"></div>
            <div className="brand-box brand-box__ktm"></div>
            <div className="brand-box brand-box__bmc"></div>
            <div className="brand-box brand-box__bridgestone"></div>
            <div className="brand-box brand-box__canyon"></div>
            <div className="brand-box brand-box__colnago"></div>
            <div className="brand-box brand-box__cannondale"></div>
            <div className="brand-box brand-box__cube"></div>
            <div className="brand-box brand-box__giant"></div>
            <div className="brand-box brand-box__trek"></div>
        </div>
      
    </section>
}

export default PartnersSection;
