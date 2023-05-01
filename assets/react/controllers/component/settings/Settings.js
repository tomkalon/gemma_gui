import React from 'react';
import SettingsPopup from "./SettingsPopup";
import './settings.scss'
import settingsScheme from '../../../common/settings.json'
import settingsData from '../../../common/settings-data.json'
import settingsDisplay from '../../../common/settings-display.json'
import DetailsSettings from "./SettingsMenu";

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

    showPopup (id, key, element, value, bool, saveHandler) {
        this.setState({
            popup: <SettingsPopup name={key} closeHandler={this.closePopup.bind(this)} settingElement={element} settingValue={value} settingBool={bool}
                                  saveHandler={saveHandler} id={id}/>,
        });
    }


    render() {
        // props
        const currentObject = this.props.currentObject;
        const selectedSettings = this.props.selectedSettings;
        const saveHandler = this.props.saveHandler;
        const global = this.props.global;
        const id = this.props.id;

        // title
        let title;
        if (selectedSettings === "other") {
            if (currentObject.readings['heat'] === undefined && currentObject.readings['blow'] === undefined) {

            }
            title = settingsDisplay.arrangement.otherTitle;
        }
        else {
            title = currentObject.readings[selectedSettings]['fullName'];
        }

        // settings
        const selectSettings = <DetailsSettings settings={currentObject.settings} selectedSettings={selectedSettings} handler={this.props.settingsHandler}
                                                readings={currentObject.readings} />;

        // functions
        const getSettingButton = (id, key, element, value, color, handler) => {
            return (<div key={key} className={`item ${color}`} onClick={() => {this.showPopup(id, key, element, value, color, handler)}}>
                <span className={`title h-20 xl:h-10 flex`}>{element.label}</span>
                <div className={`icon hidden lg:block xl:hidden`}></div>
                <div className={`icon hidden xl:flex`}>
                    {element.icon.map((item, index) => {
                        return (<i key={index} className={`gf ${item}`}></i>);
                    })}
                </div>
                <p className={`value flex`}>{value}{element.si}</p>
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
                if (settingsData[key].color) {
                    color = settingsData[key].color;
                }

                // specific sensor settings
                if (currentObject.settings[key] !== undefined) {

                    // boolean
                    if (settingsData[key].bool !== undefined) {
                        currentObject.settings[key] === true ? value = 1 : value = 0;
                        buttonList[counter] = getSettingButton(id, key, settingsData[key], settingsData[key].values[value], currentObject.settings[key], saveHandler);
                    }

                    // range
                    else {
                        if (currentObject.readings[element.rel] || settingsDisplay.environment[element.rel]) {
                            buttonList[counter] = getSettingButton(id, key, settingsData[key], currentObject.settings[key], color, saveHandler);
                        }
                    }
                    counter++;
                }

                // global settings
                else if (global[key]) {
                    if (settingsDisplay.environment[element.rel]) {
                        buttonList[counter] = getSettingButton(id, key, settingsData[key], global[key], color, saveHandler);
                    }
                    counter++;
                }

                if (element.separator) {
                    buttonList[counter] = getNewRow();
                    counter++;
                }
            }
        }

        return (<article id={`js-settings`} className={`setup mb-8`}>
            <div className={`container mx-auto pb-4 px-2 dark:bg-blue-960 rounded-b-md`}>
                <div className={`title h-16 px-2 mx-2 mb-2 dark:text-darker-100 border-y dark:border-blue-450 shadow-md`}>
                    <div className={`px-2 mt-2 float-left uppercase`}>
                        <span className={`dark:bg-blue-450 rounded-md mr-2 px-2`}>Profil</span>{currentObject.settings['name']}
                        <div className={`text-sm px-2 bg-gradient-to-r rounded-md dark:from-blue-470 dark:to-transparent-0`}>{title}</div>
                    </div>
                    <div className={`float-right mt-3 mr-2`}><button className={`btn btn-blue`}>Zmień profil</button></div>
                    {selectSettings}
                </div>
                <div className={`dark:text-darker-100 mt-4`}>
                    <div className={`box flex rounded`}>
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