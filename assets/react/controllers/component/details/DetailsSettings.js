import React from 'react';

class DetailsSettings extends React.Component {

    render() {

        // props
        const settings = this.props.settings;
        const readings = this.props.readings;

        console.log(readings);

        let tempSetup, humidSetup, ventSetup, shadowSetup, otherSetup;
        // === SETTINGS
        // TEMPERATURE
        if (settings['temp_enable'] && readings['temp']) {
            tempSetup = <div className={`element`}>
                <i className={`gf gf-temp3 text-red-500`}></i>
                <p>Temperatura</p>
            </div>;
        }

        // HUMIDITY
        if (settings['humid_enable'] && readings['humid']) {
            humidSetup = <div className={`element`}>
                <i className={`gf gf-humidity text-sky-300`}></i>
                <p>Wilgotność</p>
            </div>;
        }

        // VENTILATOR
        if (settings['vent_enable'] && readings['vent']) {
            ventSetup = <div className={`element`}>
                <i className={`gf gf-vent3 text-lime-500`}></i>
                <p>Wietrznik</p>
            </div>;
        }

        // SHADOWS
        if (settings['shadow_enable'] && readings['shadow']) {
            shadowSetup = <div className={`element`}><i className={`gf gf-shadow text-amber-300`}></i>
                <p>Cieniówka</p>
            </div>;
        }

        // OTHER
        if ((settings['heat_enable'] && readings['heat']) || (settings['blow_enable'] && readings['heat'])) {
            otherSetup = <div className={`element`}>
                <i className={`gf gf-manual text-cyan-500`}></i>
                <p>Pozostałe</p>
            </div>;
        }

        return (<div className={`label settings float-left`}>
                <div className={`title`}>Ustawienia obiektu:</div>
                {tempSetup}{humidSetup}{ventSetup}{shadowSetup}{otherSetup}
            </div>)
    }
}

export default DetailsSettings;