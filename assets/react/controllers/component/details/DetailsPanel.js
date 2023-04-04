import React from 'react';
import DetailsSetpoint from "./panel/DetailsSetpoint";
import DetailsValueBox from "./panel/DetailsValueBox";

class DetailsPanel extends React.Component {

    render() {

        // props
        const type = this.props.type;
        const shortName = this.props.shortName;
        const fullName = this.props.fullName;
        const settings = this.props.settings;
        const isSettings = this.props.isSettings;
        const sensor = this.props.sensor;
        const isDay = this.props.isDay;

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
                diff[index] = Number.parseFloat(element) - Number.parseFloat(setup);
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

        // let tempSetup, humidSetup, ventSetup, shadowSetup, otherSetup;
        // // === SETTINGS
        // // TEMP
        // if ((setupDay !== false) || setupNight !== undefined) {
        //     tempSetup = <li className={`element active`}>
        //         <i className={`gf gf-temp3 text-red-500`}></i>
        //         <p>Temperatura</p>
        //     </li>;
        // }
        //
        // // HUMID
        // if ((setupDay !== false) || setupNight !== undefined) {
        //     humidSetup = <li className={`element`}>
        //         <i className={`gf gf-humidity text-sky-300`}></i>
        //         <p>Wilgotność</p>
        //     </li>;
        // }
        // ventSetup = <li className={`element`}>
        //     <i className={`gf gf-vent3 text-lime-500`}></i>
        //     <p>Wietrznik</p>
        // </li>;
        //
        // shadowSetup = <li className={`element`}><i className={`gf gf-shadow text-amber-300`}></i>
        //     <p>Cieniówka</p>
        // </li>;
        //
        // otherSetup = <li className={`element`}>
        //     <i className={`gf gf-manual text-cyan-500`}></i>
        //     <p>Pozostałe</p>
        // </li>;
        //
        // <ul className={`additional settings label gap-0.5 h-14 dark:bg-blue-950 border-b dark:border-blue-450`}>
        //     <li className={`title`}>Ustawienia obiektu:</li>
        //     {tempSetup}{humidSetup}{ventSetup}{shadowSetup}{otherSetup}
        // </ul>


        return (<div className={`readings chunk`}>
            <div className={`flex flex-col dark:text-blue-100 text-center uppercase`}>
                <div className={`heading label text-sm px-4 h-10 dark:bg-blue-950 border-b border-t dark:border-blue-450`}>
                    <span className={`title pr-4`}>{fullName}</span>
                    {setpoints}
                </div>
                {valueBox}
                <div className={`amplitude flex dark:bg-blue-550 border-t border-b-2 dark:border-blue-450`}>
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