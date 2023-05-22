import React from 'react';
import display from '../../../common/settings-display.json'

class DetailsBottom extends React.Component {

    constructor(props) {
        super(props);
        this.closePopupHandler = this.props.closePopupHandler;
        this.showPopupHandler = this.props.showPopupHandler;
    }


    render() {

        // props
        const settings = this.props.settings;
        const info = this.props.info;
        const indicators = this.props.indicators;
        const alerts = this.props.alerts;
        const id = this.props.id;
        const handler = this.props.handler;

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
        let sensor, sensorCounter, hardware, hardwareCounter, sensorIndicatorNew, hardwareIndicatorNew;
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
            if (sensorCounter) {
                sensor = <button className={`btn-red btn ml-2 float-right`}
                                 onClick={() => {this.showPopupHandler(info.name + ' - ' + display.arrangement["sensor-alerts"], alerts.sensor, 'warning')}}>
                    <i className={`gf gf-warning`}></i>{display.arrangement.warning}{counter(sensorCounter, sensorIndicatorNew)}
                </button>;
            } else {
                sensor = <button className={`btn-red inactive btn ml-2 float-right`}>
                    <i className={`gf gf-warning`}></i>{display.arrangement.warning}{counter(sensorCounter, sensorIndicatorNew)}
                </button>;
            }
        }

        if (hardwareCounter) {
            hardware = <button className={`btn-red btn ml-2 float-right`}
                               onClick={() => {this.showPopupHandler(info.name + ' - ' + display.arrangement["hardware-alerts"], alerts.hardware, 'damage')}}>
                <i className={`gf gf-damage`}></i>{display.arrangement.malfunction}{counter(hardwareCounter, hardwareIndicatorNew)}
            </button>;
        } else {
            hardware = <button className={`btn-red inactive btn ml-2 float-right`}>
                <i className={`gf gf-damage`}></i>{display.arrangement.malfunction}{counter(hardwareCounter, hardwareIndicatorNew)}
            </button>;
        }

        let descriptionBtn;
        if (info.description) {
            descriptionBtn = <button className={`btn-empty btn ml-2 float-right`}
                                     onClick={() => {this.showPopupHandler(info.name, info.description)}}>
                {display.arrangement.description}
            </button>;
        } else {
            descriptionBtn = <button className={`btn-empty inactive btn ml-2 float-right`}>{display.arrangement.description}</button>;
        }


        let otherOptions = <div className={`container h-12 mt-2 px-8`}>
            <button className={`btn-green btn ml-2 float-right`}
                    onClick={() => {handler(id, 'setup')}}>{display.arrangement.objectSetup}</button>
            {descriptionBtn}
            {hardware}
            {sensor}

        </div>;

        return (<div
            className={`options dark:bg-blue-960 dark:border-darker-200 dark:text-blue-100 xl:rounded-t ${rounded} shadow-md dark:shadow-gray-900/30`}>
            {otherOptions}
        </div>)
    }
}

export default DetailsBottom;