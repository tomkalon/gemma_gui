import React from 'react';

class DetailsBottom extends React.Component {

    render() {

        // props
        const settings = this.props.settings;
        const description = this.props.description;
        const indicators = this.props.indicators;
        const alerts = this.props.alerts;

        // component
        const counter = (number, blink) => {
            if (number) {
                return (
                    <div className={`btn-counter float-right ${blink}`}>{number}</div>
                )
            }
            else {
                return '';
            }
        }

        // vars
        let sensor, sensorCounter, hardwareCounter, sensorIndicatorNew, hardwareIndicatorNew;
        if (indicators) {
            sensorIndicatorNew = indicators.sensor.new;
            hardwareIndicatorNew = indicators.hardware.new;
        }

        if (alerts) {
            if (alerts.sensor) {
                sensorCounter = alerts.sensor.length;
            }
            if (alerts.hardware) {
                hardwareCounter = alerts.hardware.length;
            }
        }

        let rounded = 'rounded-b';
        if (settings) {
            rounded = '';
            sensor = <button className={`btn-red btn ml-2 float-right`}>
                <i className={`gf gf-warning`}></i>Ostrzeżenia{counter(sensorCounter, sensorIndicatorNew)}
            </button>;
        }

        let otherOptions = <div className={`container h-12 mt-2 px-8`}>
            <button className={`btn-empty btn ml-2 float-right`}>Opis</button>
            <button className={`btn-red btn ml-2 float-right`}>
                <i className={`gf gf-damage`}></i>Awarie{counter(hardwareCounter, hardwareIndicatorNew)}
            </button>
            {sensor}

        </div>;

        return (<div
            className={`options dark:bg-blue-960 dark:border-darker-200 dark:text-blue-100 xl:rounded-t ${rounded} shadow-md dark:shadow-gray-900/30`}>
            {otherOptions}
        </div>)
    }
}

export default DetailsBottom;