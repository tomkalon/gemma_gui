import React from 'react';

class DetailsPanel extends React.Component {

    render() {

        // props
        const shortName = this.props.shortName; // from icons.js
        const fullName = this.props.fullName; // from icons.js
        const settings = this.props.settings; // object state settings
        const isSettings = this.props.isSettings; // is object has settings?
        const sensor = this.props.sensor; // the sensor data like value, si, icon...
        const isDay = this.props.isDay; // time of day
        const stats = this.props.stats; // stats

        // ==== var
        let controlDay, controlNight, setupDay, setupNight;
        let day, night;
        let diff = [];
        let icons;

        // components
        let setpoints;
        let valueBox;
        let amplitude;

        // functions
        function calculateDiff(array, setup) {
            array.map((element, index) => {
                diff[index] = (Number.parseFloat(element) - Number.parseFloat(setup)).toFixed(1);
            });
        }

        function showSetpoints (day, night, isDay) {
            if (isDay) {
                return (<div className={`border-l dark:border-darker-100`}>
                    <span className={`pre px-4`}>Zadana</span>
                    {day}
                    {night}
                </div>)
            }
            else {
                return (<div className={`border-l dark:border-darker-100`}>
                    <span className={`pre px-4`}>Zadana</span>
                    {night}
                    {day}
                </div>)
            }
        }

        function showValue (sensor, diff, si) {
            let valueList;
            let active;
            if (diff.length) {
                valueList = sensor.value.map((element, index) =>
                    <div key={index} className={`box`}>
                        <span><i className={`gf ${sensor.calculated[index].icon}`}></i>{element}{si}</span>
                        <p className={`diff`}>{diff[index]}{si}</p>
                    </div>
                );
            }
            else {
                valueList = sensor.value.map((element, index) =>
                    <div key={index} className={`box`}>
                        <span><i className={`gf ${sensor.calculated[index].icon}`}></i>{element}{si}</span>
                    </div>
                );
            }

            return (
                <div className={`value flex dark:bg-blue-550`}>
                    {valueList}
                </div>
            )
        }

        // logic
        if (isSettings && isDay !== undefined) {
            if (sensor.name === 'temp') {
                controlDay = settings['temp_control_day'];
                controlNight = settings['temp_control_night'];
                setupDay = settings['temp_day'];
                setupNight = settings['temp_night'];
            } else if (sensor.name === 'humid') {
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
                setpoints = showSetpoints(day, night, isDay);
            }
            valueBox = showValue(sensor, diff, sensor['si']);
        } else {
            valueBox = showValue(sensor, false, sensor['si']);
        }

        if (stats && isDay) {
            if (sensor.name === 'temp') {
                icons = ['gf-temp2', 'gf-temp6'];
            }
            else if (sensor.name === 'humid') {
                icons = ['gf-dry', 'gf-humidity'];
            }
            amplitude = <div className={`amplitude flex dark:bg-blue-550 border-t dark:border-blue-950`}>
                <div className={`box`}>
                    <div className={`value`}><span><i className={`gf ${icons[0]}`}></i>-{sensor['si']}</span></div>
                    <div className={`label text-left`}>
                        <span>{shortName}</span>
                        <p className={`dark:text-blue-300`}>min</p>
                    </div>
                </div>
                <div className={`box`}>
                    <div className={`value`}><span><i className={`gf ${icons[1]}`}></i>-{sensor['si']}</span></div>
                    <div className={`label text-left`}>
                        <span>{shortName}</span>
                        <p className={`dark:text-red-300`}>max</p>
                    </div>
                </div>
            </div>;
        }
        return (<div className={`readings flex-wrap`}>
            <div className={`flex flex-col dark:text-blue-100 text-center uppercase`}>
                <div className={`heading label text-sm px-4 h-10 dark:bg-blue-950 border-t dark:border-blue-450`}>
                    <span className={`title pr-4`}>{fullName}</span>
                    {setpoints}
                </div>
                {valueBox}
                {amplitude}
            </div>
        </div>)
    }
}

export default DetailsPanel;