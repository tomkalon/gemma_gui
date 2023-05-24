import React from 'react';
import DetailsPanel from "./DetailsPanel";
import DetailsModules from "./DetailsModules";
import DetailsStats from "./DetailsStats";
import DetailsBottom from "./DetailsBottom";
import './details.scss'
import display from '../../../common/settings-display.json'
import Popup from "../common/Popup";

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.saveHandler = this.props.saveHandler; // save API handler

    }

    state = {
        popup: false
    }

    closePopup() {
        this.setState({
            popup: false
        })
    }

    showPopup (name, data, icon) {
        this.setState({
            popup: <Popup name={name} data={data} icon={icon} closeHandler={this.closePopup.bind(this)}/>,
        });
    }

    render() {

        // props
        const info = this.props.info; // object: id, name, description
        const state = this.props.state; // object: state -> settings, readings etc.
        const isDay = this.props.isDay; // time of day
        const stats = this.props.stats; // statistics & charts
        const indicatorIcons = this.props.indicatorIcons; // function
        const handler = this.props.linkHandler; // redirection handler

        // VAR
        let img = 'default';
        const imagesSrc = '/build/images/';

        // alert indicators
        const indicators = indicatorIcons(state.indicators);

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

        // HEAT, BLOW: modules
        let detailsModules;
        if (blow || heat) detailsModules = <DetailsModules blow={blow} heat={heat}/>;

        // STATS
        let detailsStats;
        if (stats) detailsStats = <DetailsStats stats={stats}/>;

        // DETAILS BOTTOM
        const detailsBottom = <DetailsBottom settings={settings} info={info}
                                             indicators={state.indicators} alerts={state.alerts} id={info.id} handler={handler}
                                             closePopupHandler={this.closePopup.bind(this)}
                                             showPopupHandler={this.showPopup.bind(this)} saveHandler={this.saveHandler} />;

        // PROGRESS BAR
        function renderProgressBar(value, si, indicator) {

            let arr = value.map((element, index) => {
                let leftMargin = '';
                if (index) leftMargin = 'ml-3';
                return (<div key={index} className={`bar w-full dark:bg-blue-550 h-6 ${leftMargin}`}>
                    <div className={`value flex dark:bg-darker-350 leading-none h-6`}
                         style={{width: `${element}%`}}>{element}{si}
                    </div>
                    <div
                        className={`indicator flex bg-gradient-to-r dark:from-transparent-0 dark:to-darker-100/20
                             leading-none h-6`}
                        style={{width: `${indicator}%`}}>
                    </div>
                </div>)
            })
            return (<div className={`row flex w-full`}>{arr}</div>);
        }

        function renderProgressRow(type, settings) {
            let indicatorValue;
            let name = type.desc;
            if (type.name === 'vent' && settings) {
                indicatorValue = settings.vent;
            } else if (type.name === 'shadow' && settings) {
                indicatorValue = settings.shadow;
            }

            let progressArray = renderProgressBar(type.value, type.si, indicatorValue);

            return (<div className={`box flex flex-col w-full`}>
                <div className={`w-full uppercase mb-1`}><span>{name}</span></div>
                {progressArray}
            </div>);
        }

        // var
        let progressRows = [];
        if (vent) progressRows[0] = renderProgressRow(vent, settings);
        if (shadow) progressRows[1] = renderProgressRow(shadow, settings);


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
                panels.push(<DetailsPanel fullName={tempFullName} shortName={tempShortName} key={tempShortName} sensor={sensor}
                                          isSettings={isSettings} settings={settings} isDay={isDay} stats={stats}/>);
            }
            if (readings.humid !== undefined) {
                humidFullName = readings.humid.fullName;
                humidShortName = readings.humid.shortName;
                sensor = readings.humid;
                panels.push(<DetailsPanel fullName={humidFullName} shortName={humidShortName} key={humidShortName} sensor={sensor}
                                          isSettings={isSettings} settings={settings} isDay={isDay} stats={stats}/>);
            }
        }

        return (<article className="">
            <div className={`detail container mx-auto`}>
                <div id={`js-object-detail`}>
                    <div
                        className={`h-8 bg-gradient-to-br dark:from-blue-950 dark:to-blue-960 border-b border-t dark:border-blue-450 flex rounded-t xl:rounded-md shadow-md relative dark:shadow-gray-900/30`}>
                        <div className={`label w-full px-4 container mx-auto text-sm`}>
                            <span className={`dark:text-darker-0 pr-4`}>{display.arrangement.objectNo}{info.order}</span>
                            <span className={`dark:text-sky-200 border-l dark:border-darker-100 pl-4`}>{name}</span>
                            <span className={`dark:text-sky-200 pl-4`}>{indicators['sensor']}</span>
                            <span className={`dark:text-sky-200 pl-4`}>{indicators['hardware']}</span>
                        </div>
                    </div>
                    <div className={`data`}>
                        <div className={`container mx-auto block justify-center xl:px-2`}>
                            <div className={`image-box float-left hidden xl:block`}>
                                <div
                                    className={`image dark:bg-darker-900 rounded-md border dark:border-darker-500 shadow-md dark:shadow-gray-900/50`}>
                                    <div className={`img h-32 mt-2 mx-2 cursor-pointer`}
                                         style={{backgroundImage: `url("${imagesSrc}${img}.webp")`}}></div>
                                    <div className={`desc text-center uppercase`}>
                                            <span
                                                className={`text-sm dark:text-darker-200`}>{display.arrangement.objectType}:</span>
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
                                className={`additional flex text-center bg-gradient-to-t dark:from-blue-950 dark:to-blue-960 dark:text-blue-100 border-b-2 dark:border-blue-450 h-14`}>
                                <div className={`progress mt-2 float-left flex`}>
                                    {progressRows.map((element, index) => (<div key={index} className={`box flex w-full ml-3`}>
                                            {element}
                                        </div>))}
                                </div>
                                {detailsStats}
                                {detailsModules}
                            </div>
                        </div>
                        {detailsBottom}
                    </div>
                </div>
            </div>
            { this.state.popup }
        </article>);
    }
}

export default Details;