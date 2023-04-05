import React from 'react';
import DetailsLabel from "./DetailsLabel";
import DetailsPanel from "./DetailsPanel";
import DetailsSettings from "./DetailsSettings";
import DetailsModules from "./DetailsModules";
import DetailsStats from "./DetailsStats";
import './details.scss'
import DetailsProgress from "./DetailsProgress";

class Details extends React.Component {

    render() {

        // props
        const info = this.props.info; // object: id, name
        const state = this.props.state; // object: state -> settings, readings etc.
        const sequenceNumber = this.props.current + 1; // Object number: starting with 1
        const isDay = this.props.isDay; // time of day
        const stats = this.props.stats; // statistics & charts

        // readings
        let readings = state.readings;
        let sensor;
        let blow, heat, vent, shadow;

        if (readings['blow']) blow = readings['blow'];
        if (readings['heat']) heat = readings['heat'];
        if (readings['vent']) vent = readings['vent'];
        if (readings['shadow']) shadow = readings['shadow'];

        // settings
        let isSettings;
        let settings;

        if (state.settings !== undefined) {
            isSettings = true;
            settings = state.settings;
        }
        let selectSettings;
        if (isSettings) selectSettings = <DetailsSettings settings={settings} readings={readings} />;

        // HEAT, BLOW: modules
        let detailsModules;
        if (blow || heat) detailsModules = <DetailsModules blow={blow} heat={heat} />;

        // STATS
        let detailsStats;
        if (stats) detailsStats = <DetailsStats stats={stats} />;

        // PROGRESS BAR
        let progressBar;
        if (vent || shadow) progressBar = <DetailsProgress vent={vent} shadow={shadow} settings={'settings'} />;


        // OBJECT INFO
        let name;
        if (info) name = info.name;

        // PANELS
        let panels = [];
        let tempFullName, tempShortName, humidFullName, humidShortName;
        if (state) {
            if (readings.temp !== undefined) {
                tempFullName = readings.temp.fullName;
                tempShortName = readings.temp.shortName;
                sensor = readings.temp;
                panels.push(<DetailsPanel fullName={tempFullName} shortName={tempShortName} type="temp" key={tempShortName}
                                          sensor={sensor}
                                          isSettings={isSettings} settings={settings} isDay={isDay} stats={stats}/>);
            }
            if (readings.humid !== undefined) {
                humidFullName = readings.humid.fullName;
                humidShortName = readings.humid.shortName;
                sensor = readings.humid;
                panels.push(<DetailsPanel fullName={humidFullName} shortName={humidShortName} type="humid" key={humidShortName}
                                          sensor={sensor}
                                          isSettings={isSettings} settings={settings} isDay={isDay} stats={stats}/>);
            }
        }

        const component = <div id={`js-object-detail`}>
            <DetailsLabel name={name} sequenceNumber={sequenceNumber}/>
            <div className={`data`}>
                <div className={`container mx-auto block justify-center px-2`}>
                    <div className={`image-box float-left hidden xl:block`}>
                        <div
                            className={`image dark:bg-darker-900 rounded-md border dark:border-darker-500 shadow-md dark:shadow-gray-900/50`}>
                            <div className={`img h-32 mt-2 mx-2`}></div>
                            <div className={`desc text-center uppercase`}>
                                <span className={`text-sm dark:text-darker-200`}>Typ obiektu:</span>
                                <p className={`dark:text-darker-100`}>developer</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex`}>
                        {panels.map((element) => {
                            return element;
                        })}
                    </div>
                    <div
                        className={`additional text-center bg-gradient-to-t dark:from-blue-950 dark:to-blue-960 dark:text-blue-100 border-b-2 dark:border-blue-450 h-14`}>
                        <div>
                            {selectSettings}
                            {detailsStats}
                            {detailsModules}
                        </div>
                    </div>
                </div>
                {progressBar}
            </div>
        </div>;

        return (<div className={`detail`}>{component}</div>);
    }
}

export default Details;