import React from 'react';
import SettingsPopup from "./SettingsPopup";
import './settings.scss'
import settingsScheme from '../../common/settings.json'
import parser from 'html-react-parser';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popup: true
        }

    }

    closePopup () {
        this.setState({
            popup: false
        })
    }

    showPopup (event) {
        this.setState({
            popup: true
        })
    }


    render() {

        // props
        const state = this.props.state;
        const selectedSettings = this.props.selectedSettings;
        const global = this.props.global;

        //var
        const settings = state.settings;
        const readings = state.readings;
        const environment = settingsScheme.environment;
        let display = {};
        let counter = 0;

        // var title
        let title;
        if (selectedSettings === "other") {
            title = settingsScheme.arrangement.otherTitle;
        }
        else {
            title = readings[selectedSettings]['fullName'];
        }

        // components
        let popup;
        if (this.state.popup) {
            popup = <SettingsPopup closeHandler={this.closePopup.bind(this)}/>
        }

        // functions
        const getSettingButton = (key, element, value, color) => {
            return (<div key={key} className={`item ${color}`} onClick={this.showPopup.bind(this)}>
                <span className={`title`}>{parser(element.desc)}</span>
                <div className={`icon`}>
                    {element.icon.map((item, index) => {
                        return (<i key={index} className={`gf ${item}`}></i>);
                    })}
                </div>
                <p className={`value`}>{value}{element.si}</p>
            </div>)
        }

        const getNewRow = () => {
            return (<span key={'separator'} className="separator"></span>)
        }


        //logic
        if (selectedSettings !== false && settingsScheme[selectedSettings] !== undefined) {
            let value;
            let color = settingsScheme.arrangement.default;
            for (const [key, element] of Object.entries(settingsScheme[selectedSettings])) {

                // if there is color saved in scheme use it
                if (element.color) {
                    color = element.color;
                }

                // specific sensor settings
                if (settings[key] !== undefined) {

                    // boolean
                    if (element.bool !== undefined) {
                        settings[key] === true ? value = 1 : value = 0;
                        display[counter] = getSettingButton(key, element, element.values[value], settingsScheme.arrangement.bool[value]);
                    }

                    // range
                    else {
                        if (readings[element.rel] || environment[element.rel]) display[counter] = getSettingButton(key, element, settings[key], color);
                    }
                    counter++;
                }

                // global settings
                else if (global[key]) {
                    if (environment[element.rel]) {
                        display[counter] = getSettingButton(key, element, global[key], color);
                    }
                    counter++;
                }

                if (element.separator) {
                    display[counter] = getNewRow();
                    counter++;
                }
            }
        }

        return (<article id={`js-settings`} className={`setup`}>
            <div
                className={`container mx-auto flex bg-gradient-to-br dark:from-darker-700 dark:to-darker-900 dark:text-darker-100 rounded-md shadow-md relative dark:shadow-gray-900/30`}>
                <div className={`label px-4 h-8`}>Ustawienia: {title}</div>
            </div>
            <div className={`dark:text-darker-100`}>
                <div className={`container mx-auto`}>
                    <div className={`box flex rounded-b`}>
                        <div id={`js-settings-content`} className={`box-content flex flex-grow`}>
                            {Object.values(display)}
                        </div>
                    </div>
                </div>
            </div>
            { popup }
        </article>)
    }
}

export default Settings;