import React from 'react';
import SettingsPopup from "./SettingsPopup";
import './settings.scss'
import settingsScheme from '../../../common/settings.json'
import settingsData from '../../../common/settings-data.json'
import settingsDisplay from '../../../common/settings-display.json'
import SettingsMenu from "./SettingsMenu";
import SettingsSimpleMenu from "./SettingsSimpleMenu";

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

    showPopup (id, key, element, value, bool, saveHandler, simple) {
        this.setState({
            popup: <SettingsPopup name={key} closeHandler={this.closePopup.bind(this)} settingElement={element} settingValue={value} settingBool={bool}
                                  saveHandler={saveHandler} id={id} simple={simple}/>,
        });
    }

    render() {
        // props
        const currentObject = this.props.currentObject;
        const selectedSettings = this.props.selectedSettings;
        const saveHandler = this.props.saveHandler;
        const linkHandler = this.props.linkHandler;
        const global = this.props.global;
        const id = this.props.id;
        const prepareSettingsButton = this.props.displayLogic;
        const simple = this.props.simple;

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
        let selectSettings;
        if (simple) {
            selectSettings = <SettingsSimpleMenu settings={currentObject.settings} selectedSettings={selectedSettings} handler={this.props.settingsHandler}
                                           readings={currentObject.readings}/>;
        } else {
            selectSettings = <SettingsMenu settings={currentObject.settings} selectedSettings={selectedSettings} handler={this.props.settingsHandler}
                                                 readings={currentObject.readings}/>;
        }

        // functions
        const getSettingButton = (id, key, element, value, color, handler) => {
            return (<div key={key} className={`item ${color}`}
                         onClick={() => {this.showPopup(id, key, element, value, color, handler, '')}}>
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

        const getSimpleSettingButton = (id, key, element, value, color, handler) => {
            return (<div key={key} className={`item w-full dark:bg-darker-300 ${color}`}>
                <div className={`icon w-full h-2`}></div>
                <div className={`label py-2 px-4 text-4xl dark:text-darker-0 bg-gradient-to-r dark:from-darker-600 dark:to-darker-500`}>{element.label}</div>
                <div className={`icon w-full h-2 dark:text-darker-0`}>
                    <div className={`float-left text-5xl p-6`}>{value}{element.si}</div>
                    <button className={`float-right btn btn-empty btn-lg my-4 mr-8`}
                            onClick={() => {this.showPopup(id, key, element, value, color, handler, 'simple')}}>
                        {settingsDisplay.arrangement.changeCaption}
                    </button>
                </div>
                <div className={`w-full h-20 dark:bg-darker-850`}></div>
            </div>)
        }

        const getNewRow = () => {
            return (<span key={'separator'} className="separator"></span>)
        }

        if (simple) {
            let buttonList = prepareSettingsButton(id, selectedSettings, settingsScheme, settingsData,
                currentObject, global, settingsDisplay, getSimpleSettingButton, saveHandler, getNewRow);
            return (<div className={`simple-settings dark:bg-darker-700`}>
                <div>
                    <div className={`w-full overflow-auto px-4 py-4 dark:bg-darker-800 border-t-2 border-b-2 dark:border-darker-500`}>
                        <div className={`dark:text-darker-100 float-left w-60`}>
                            <span className={`text-2xl`}>{settingsDisplay.arrangement.settings}:</span>
                            <p className={`text-3xl uppercase`}>{title}</p>
                        </div>
                        <button className={`btn btn-blue btn-lg float-right dark:text-darker-100`}
                                onClick={() => {linkHandler(id, 'setup/edit_profile')}}>
                            {settingsDisplay.arrangement.changeProfile}
                        </button>
                        <div className={`float-left dark:text-darker-100 text-2xl`}>
                            <span>{settingsDisplay.arrangement.profile}:</span>
                            <p className={`text-3xl uppercase`}>{currentObject.settings['name']}</p>
                        </div>
                    </div>
                    <div className={`mb-56 mt-4 border-b-2 dark:border-darker-500`}>
                        { Object.values(buttonList) }
                    </div>
                </div>
                {selectSettings}
                { this.state.popup }
            </div>);
        } else {
            let buttonList = prepareSettingsButton(id, selectedSettings, settingsScheme, settingsData,
                currentObject, global, settingsDisplay, getSettingButton, saveHandler, getNewRow);
            return (<article id={`js-settings`} className={`setup mb-8`}>
                <div className={`container mx-auto pb-4 px-2 dark:bg-blue-960 rounded-b-md`}>
                    <div className={`title h-16 px-2 mx-2 mb-2 dark:text-darker-100 border-y dark:border-blue-450 shadow-md`}>
                        <div className={`px-2 mt-2 float-left uppercase`}>
                            <span className={`dark:bg-blue-450 rounded-md mr-2 px-2`}>{settingsDisplay.arrangement.profile}</span>
                            {currentObject.settings['name']}
                            <div className={`text-sm px-2 bg-gradient-to-r rounded-md dark:from-blue-470 dark:to-transparent-0`}>{title}</div>
                        </div>
                        <div className={`float-right mt-3 mr-2`}>
                            <button className={`btn btn-blue`}
                                    onClick={() => {linkHandler(id, 'setup/edit_profile')}}>
                            {settingsDisplay.arrangement.changeProfile}
                            </button>
                        </div>
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
}

export default Settings;