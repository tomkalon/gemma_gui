import React from 'react';
import SettingsPopupRange from "./SettingsPopupRange";
import SettingsPopupRadio from "./SettingsPopupRadio";
import settingsDisplay from '../../../common/settings-display.json'
import settings from "./Settings";

class SettingsPopup extends React.Component {
    constructor(props) {
        super(props);
        this.value = this.props.settingValue;
        this.bool = this.props.settingBool;
        this.id = this.props.id;
        this.type = false;
    }

    state = {
        value: this.props.settingValue
    }

    getData(data) {
        this.setState({value: data});
    }

    saveData (name, data, saveHandler, closeHandler, isGlobal) {
        if (this.type === 'range') {
            saveHandler(this.id, data, name, isGlobal);
        }
        else if (this.type === 'radio') {
            saveHandler(this.id, !this.bool, name, isGlobal);
        }
        closeHandler();
    }

    render() {

        // props
        const settingElement = this.props.settingElement;
        const settingBool = this.props.settingBool;
        const closeHandler = this.props.closeHandler;
        const saveHandler = this.props.saveHandler;
        const name = this.props.name;

        // var
        let description;
        if (settingElement.description !== undefined) {
            description = <div className={`description`}><span>{settingElement.description}</span></div>;
        }

        let settingsForm, saveCaption;
        if (settingElement.bool === undefined) {
            this.type = 'range';
            saveCaption = settingsDisplay.arrangement.rangeSaveCaption;
            settingsForm = <SettingsPopupRange settingValue={this.state.value} step={settingElement.step} range={settingElement.range}
                                               thresholds={settingElement.thresholds} sendData={this.getData.bind(this)}/>;
        }
        else {
            saveCaption = settingsDisplay.arrangement.radioSaveCaption;
            this.type = 'radio';
            settingsForm = <SettingsPopupRadio settingBool={settingBool} settingElement={settingElement}/>;
        }

        return (<div className={`js-settings-popup-cover z-40 fixed flex justify-center items-center top-0`}>
            <div id='js-settings-popup' className={`settings-popup rounded-lg flex flex-col justify-between dark:text-blue-50`}>
                <div className={`label h-12 mx-1 px-2 border-b dark:border-blue-450`}>
                    <span>{settingElement.label}</span>
                    <button className={`js-btn-close`}><i className={`gf gf-close`} onClick={closeHandler}></i></button>
                </div>
                {description}
                <div className={`content ${this.type}`}>
                    {settingsForm}
                </div>
                <div className={`buttons h-16 pt-3 px-4 mx-1 border-t dark:border-blue-450`}>
                    <div className={`mt-2 float-left`}>
                        Aktualne wartość: <span className={`p-2 dark:bg-blue-950 rounded-lg`}>{this.value}{settingElement['si']}</span>
                    </div>
                    <button className={`btn btn-green float-right ml-4`}
                            onClick={() => {this.saveData(name, this.state.value, saveHandler, closeHandler, settingElement.global)}}>{saveCaption}</button>
                    <button className={`btn btn-empty float-right`} onClick={closeHandler}>Zamknij</button>
                </div>
            </div>
        </div>)
    }
}


export default SettingsPopup;