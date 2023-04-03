import React from 'react';
import DetailsSetpoint from "./panel/DetailsSetpoint";
import DetailsValueBox from "./panel/DetailsValueBox";

class DetailsPanel extends React.Component {

    render() {

        // props
        let type = this.props.type;
        let shortName = this.props.shortName;
        let fullName = this.props.fullName;
        let settings = this.props.settings;
        let isSettings = this.props.isSettings;
        let sensor = this.props.sensor;
        let isDay = this.props.isDay;

        // var
        let tempControlDay = settings['temp_control_day'];
        let tempDay = settings['temp_day'];
        let tempControlNight = settings['temp_control_night'];
        let tempNight = settings['temp_night'];

        let humidControlDay = settings['humid_control_day'];
        let humidDay = settings['humid_day'];
        let humidControlNight = settings['humid_control_night'];
        let humidNight = settings['humid_night'];


        // components
        let setpoints;
        let valueBox;

        // logic
        if (isSettings) {
            if (type === 'temp') {
                if (tempControlDay || tempControlNight) {
                    setpoints = <DetailsSetpoint isDay={isDay} settings={settings} type={type} si={sensor['si']}
                                                 controlDay={tempControlDay} controlNight={tempControlNight} valueDay={tempDay} valueNight={tempNight}/>;
                }
                valueBox = <DetailsValueBox />;
            }
            else if (type === 'humid') {
                if (humidControlDay || humidControlNight) {
                    setpoints = <DetailsSetpoint isDay={isDay} settings={settings} type={type} si={sensor['si']}
                                                 controlDay={humidControlDay} controlNight={humidControlNight} valueDay={humidDay} valueNight={humidNight}/>;
                }
                valueBox = <DetailsValueBox />;
            }
        }
        else {
            valueBox = <DetailsValueBox />;
        }

        return (
            <div className={`readings chunk`}>
                <div className={`flex flex-col dark:text-blue-100 text-center uppercase`}>
                    <div className={`heading label text-sm px-4 h-10 dark:bg-blue-950 border-b border-t dark:border-blue-450`}>
                        <span className={`title pr-4`}>{fullName}</span>
                        {setpoints}
                    </div>
                    <div className={`value flex dark:bg-blue-550`}>
                        {valueBox}
                    </div>
                    <div className={`amplitude flex dark:bg-blue-550 border-t border-b-2 dark:border-blue-450`}>
                        <div className={`box`}>
                            <div className={`value`}><span><i className={`gf gf-temp2`}></i>-°C</span></div>
                            <div className={`label text-left`}>
                                <span>{shortName}</span>
                                <p className={`dark:text-blue-300`}>min</p>
                            </div>
                        </div>
                        <div className={`box`}>
                            <div className={`value`}><span><i className={`gf gf-temp6`}></i>-°C</span></div>
                            <div className={`label text-left`}>
                                <span>{shortName}</span>
                                <p className={`dark:text-red-300`}>max</p>
                            </div>
                        </div>
                    </div>
                    {/*<ul className={`additional settings label gap-0.5 h-14 dark:bg-blue-950 border-b dark:border-blue-450`}>*/}
                    {/*    <li className={`title`}>Ustawienia obiektu:</li>*/}
                    {/*    <li className={`element active`}>*/}
                    {/*        <i className={`gf gf-temp3 text-red-500`}></i>*/}
                    {/*        <p>Temperatura</p>*/}
                    {/*    </li>*/}
                    {/*    <li className={`element`}>*/}
                    {/*        <i className={`gf gf-humidity text-sky-300`}></i>*/}
                    {/*        <p>Wilgotność</p>*/}
                    {/*    </li>*/}
                    {/*    <li className={`element`}>*/}
                    {/*        <i className={`gf gf-vent3 text-lime-500`}></i>*/}
                    {/*        <p>Wietrznik</p>*/}
                    {/*    </li>*/}
                    {/*    <li className={`element`}><i className={`gf gf-shadow text-amber-300`}></i>*/}
                    {/*        <p>Cieniówka</p>*/}
                    {/*    </li>*/}
                    {/*    <li className={`element`}>*/}
                    {/*        <i className={`gf gf-manual text-cyan-500`}></i>*/}
                    {/*        <p>Pozostałe</p>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
            </div>
        )
    }
}

export default DetailsPanel;