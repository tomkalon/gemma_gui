import React from 'react';
import "./simple-menu.scss"
import settingsScheme from "../../../common/settings.json";
import settingsData from "../../../common/settings-data.json";
import settingsDisplay from "../../../common/settings-display.json";

class SimpleSettings extends React.Component {

    constructor(props) {
        super(props);
        this.currentObject = this.props.currentObject;
        this.saveHandler = this.props.saveHandler;
        this.settingsHandler = this.props.settingsHandler;
        this.global = this.props.global;
        this.id = this.props.id;
        this.prepareSettingsButton = this.props.displayLogic;
    }

    render() {
        const selectedSettings = this.props.selectedSettings;

        let display = {};
        for (const [key, element] of Object.entries(this.currentObject.readings)) {
            let active = '';
            if (selectedSettings === key) {
                active = ' active';
            }
            if (settingsDisplay.enable[key]) {
                if (key === "shadow") {
                    if (settingsDisplay.environment['sun']) {
                        display[key] = <div key={key} className={`text-6xl w-32 text-center p-3 dark:bg-darker-700 mx-1 element${active}`}
                                            onClick={() => this.settingsHandler(key, 300)}>
                            <i className={`gf ${element['settingsStyle']}`}></i>
                        </div>
                    }
                }
                else {
                    display[key] = <div key={key} className={`text-6xl w-32 text-center p-3 dark:bg-darker-700 mx-1 element${active}`}
                                        onClick={() => this.settingsHandler(key, 300)}>
                        <i className={`gf ${element['settingsStyle']}`}></i>
                    </div>
                }
            }
        }

        const getSettingButton = (id, key, element, value, color, handler) => {
            return (<div key={key} className={`item border-t-2 border-b-2 dark:border-darker-900 w-full dark:bg-darker-300 ${color}`}>
                <div className={`icon w-full h-2`}></div>
                <div className={`label py-2 px-4 text-4xl dark:text-darker-0 bg-gradient-to-r dark:from-darker-600 dark:to-darker-500`}>{element.label}</div>
                <div className={`icon w-full h-2`}>
                    <div className={`text-5xl dark:text-darker-0 p-6`}>{value}{element.si}</div>
                </div>
                <div className={`w-full h-20 dark:bg-darker-850`}></div>
            </div>)
        }
        const getNewRow = () => {};

        let buttonList = this.prepareSettingsButton(this.id, selectedSettings, settingsScheme, settingsData,
            this.currentObject, this.global, settingsDisplay, getSettingButton, this.saveHandler, getNewRow);
        console.log(buttonList);

        return (<div className={`simple-settings`}>
            <div>
                <div className={`label px-4 py-4 dark:bg-darker-800`}>
                    <span className={`dark:text-darker-100 text-4xl`}>Ustawienia</span>
                </div>
                <div className={`mb-56`}>
                    { Object.values(buttonList) }
                </div>
            </div>
            <div className={`settings-menu fixed flex justify-center bottom-28 h-24 py-1 w-full border-t dark:border-darker-200 bg-gradient-to-b dark:from-darker-800 dark:to-darker-700`}>
                { Object.values(display) }
            </div>
        </div>);
    }
}

export default SimpleSettings;