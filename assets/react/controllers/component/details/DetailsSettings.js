import React from 'react';

class DetailsSettings extends React.Component {

    render() {

        // props
        const settings = this.props.settings;

        let tempSetup, humidSetup, ventSetup, shadowSetup, otherSetup;
        // === SETTINGS
        // TEMPERATURE
        if (settings['temp_enable']) {
            tempSetup = <div className={`element`}>
                <i className={`gf gf-temp3 text-red-500`}></i>
                <p>Temperatura</p>
            </div>;
        }

        // HUMIDITY
        if (settings['humid_enable']) {
            humidSetup = <div className={`element`}>
                <i className={`gf gf-humidity text-sky-300`}></i>
                <p>Wilgotność</p>
            </div>;
        }

        // VENTILATOR
        if (settings['vent_enable']) {
            ventSetup = <div className={`element`}>
                <i className={`gf gf-vent3 text-lime-500`}></i>
                <p>Wietrznik</p>
            </div>;
        }

        // SHADOWS
        if (settings['shadow_enable']) {
            shadowSetup = <div className={`element`}><i className={`gf gf-shadow text-amber-300`}></i>
                <p>Cieniówka</p>
            </div>;
        }

        // OTHER
        if (settings['heat_enable'] || settings['blow_enable']) {
            otherSetup = <div className={`element`}>
                <i className={`gf gf-manual text-cyan-500`}></i>
                <p>Pozostałe</p>
            </div>;
        }

        return (<div className={`label`}>
                <div className={`title`}>Ustawienia obiektu:</div>
                {tempSetup}{humidSetup}{ventSetup}{shadowSetup}{otherSetup}
            </div>)
    }
}

export default DetailsSettings;