import React from 'react';
import DetailsSetpoint from "./panel/DetailsSetpoint";
import DetailsValueBox from "./panel/DetailsValueBox";

class DetailsPanel extends React.Component {

    render() {

        // props
        const type = this.props.type; // custom prop - type: temp, humid
        const shortName = this.props.shortName; // from icons.js
        const fullName = this.props.fullName; // from icons.js
        const settings = this.props.settings; // object state settings
        const isSettings = this.props.isSettings; // is object has settings?
        const sensor = this.props.sensor; // the sensor data like value, si, icon...
        const isDay = this.props.isDay; // time of day

        // ==== var
        let controlDay, controlNight, setupDay, setupNight;
        let day, night;
        let diff = [];

        // components
        let setpoints;
        let valueBox;

        // functions
        function calculateDiff(array, setup) {
            array.map((element, index) => {
                diff[index] = (Number.parseFloat(element) - Number.parseFloat(setup)).toFixed(1);
            });
        }

        // logic
        if (isSettings) {
            if (type === 'temp') {
                controlDay = settings['temp_control_day'];
                controlNight = settings['temp_control_night'];
                setupDay = settings['temp_day'];
                setupNight = settings['temp_night'];
            } else if (type === 'humid') {
                controlDay = settings['humid_control_day'];
                controlNight = settings['humid_control_night'];
                setupDay = settings['humid_day'];
                setupNight = settings['humid_night'];
            }

            if (controlDay || controlNight) {
                if (isDay) {
                    if (controlDay && (setupDay !== undefined)) {
                        calculateDiff(sensor.value, setupDay);
                        day = <span className={`post pr-4 active`}><i className={`gf gf-day rotate`}></i>{setupDay}{sensor['si']}</span>
                    }
                    if (controlNight && (setupNight !== undefined)) {
                        night = <span className={`post`}><i className={`gf gf-night`}></i>{setupNight}{sensor['si']}</span>;
                    }
                } else {
                    if (controlDay) {
                        day = <span className={`post`}><i className={`gf gf-day`}></i>{setupDay}{sensor['si']}</span>;
                    }
                    if (controlNight) {
                        calculateDiff(sensor.value, setupDay);
                        night = <span className={`post pr-4 active`}><i
                            className={`gf gf-night`}></i>{setupNight}{sensor['si']}</span>;
                    }
                }
                setpoints = <DetailsSetpoint day={day} night={night} isDay={isDay}/>;
            }
            valueBox = <DetailsValueBox sensor={sensor} diff={diff} si={sensor['si']}/>;
        } else {
            valueBox = <DetailsValueBox sensor={sensor} diff={false} si={sensor['si']}/>;
        }

        return (<div className={`readings chunk flex-wrap`}>
            <div className={`flex flex-col dark:text-blue-100 text-center uppercase`}>
                <div className={`heading label text-sm px-4 h-10 dark:bg-blue-950 border-t dark:border-blue-450`}>
                    <span className={`title pr-4`}>{fullName}</span>
                    {setpoints}
                </div>
                {valueBox}
                <div className={`amplitude flex dark:bg-blue-550 border-t dark:border-blue-950`}>
                    <div className={`box`}>
                        <div className={`value`}><span><i className={`gf gf-temp2`}></i>-{sensor['si']}</span></div>
                        <div className={`label text-left`}>
                            <span>{shortName}</span>
                            <p className={`dark:text-blue-300`}>min</p>
                        </div>
                    </div>
                    <div className={`box`}>
                        <div className={`value`}><span><i className={`gf gf-temp6`}></i>-{sensor['si']}</span></div>
                        <div className={`label text-left`}>
                            <span>{shortName}</span>
                            <p className={`dark:text-red-300`}>max</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default DetailsPanel;