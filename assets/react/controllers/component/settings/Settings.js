import React from 'react';
import SettingsPopup from "./SettingsPopup";
import './settings.scss'
import settingsScheme from '../../common/settings.json'
import settingsDisplay from '../../common/settings-display.json'

class Settings extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        popup: false,
    }

    closePopup () {
        this.setState({
            popup: false
        })
    }

    showPopup (key, element, value, bool, saveHandler) {
        this.setState({
            popup: <SettingsPopup name={key} closeHandler={this.closePopup.bind(this)} settingElement={element} settingValue={value} settingBool={bool}
                                  saveHandler={saveHandler}/>,
        });
    }

    getUpdatedValue (data) {
        console.log(data);
    }

    render() {
        // props
        const currentObject = this.props.currentObject;
        const selectedSettings = this.props.selectedSettings;
        const saveHandler = this.props.saveHandler;
        const global = this.props.global;

        //var
        const settings = currentObject.settings;
        const readings = currentObject.readings;

        // var title
        let title;
        if (selectedSettings === "other") {
            title = settingsDisplay.arrangement.otherTitle;
        }
        else {
            title = readings[selectedSettings]['fullName'];
        }

        // functions
        const getSettingButton = (key, element, value, color, handler) => {
            return (<div key={key} className={`item ${color}`} onClick={() => {this.showPopup(key, element, value, color, handler)}}>
                <span className={`title`}>{element.label}</span>
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
        let buttonList = {};
        let counter = 0;
        if (selectedSettings !== false && settingsScheme[selectedSettings] !== undefined) {
            let value;
            let color = settingsDisplay.arrangement.default;
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
                        buttonList[counter] = getSettingButton(key, element, element.values[value], settings[key], saveHandler);
                    }

                    // range
                    else {
                        if (readings[element.rel] || settingsDisplay.environment[element.rel]) {
                            buttonList[counter] = getSettingButton(key, element, settings[key], color, saveHandler);
                        }
                    }
                    counter++;
                }

                // global settings
                else if (global[key]) {
                    if (settingsDisplay.environment[element.rel]) {
                        buttonList[counter] = getSettingButton(key, element, global[key], color, saveHandler);
                    }
                    counter++;
                }

                if (element.separator) {
                    buttonList[counter] = getNewRow();
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
                            {Object.values(buttonList)}
                        </div>
                    </div>
                </div>
            </div>
            { this.state.popup }
        </article>)
    }
}

export default Settings;