import React from 'react';
import SettingsPopupRange from "./SettingsPopupRange";
import SettingsPopupRadio from "./SettingsPopupRadio";
import settingsDisplay from '../../../common/settings-display.json'

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
        const simple = this.props.simple;

        // var
        let description;
        if (settingElement.description !== undefined) {
            description = <div className={`description leading-relaxed lg:leading-normal text-3xl lg:text-base`}><span>{settingElement.description}</span></div>;
        }

        let settingsForm, saveCaption;
        if (settingElement.bool === undefined) {
            this.type = 'range';
            saveCaption = settingsDisplay.arrangement.saveCaption;
            settingsForm = <SettingsPopupRange settingValue={this.state.value} step={settingElement.step} range={settingElement.range}
                                               thresholds={settingElement.thresholds}
                                               sendData={this.getData.bind(this)} simple={simple}/>;
        }
        else {
            saveCaption = settingsDisplay.arrangement.changeCaption;
            this.type = 'radio';
            settingsForm = <SettingsPopupRadio settingBool={settingBool} settingElement={settingElement}/>;
        }

        return (<div className={`js-settings-popup-cover ${simple} z-50 lg:z-30 fixed flex justify-center items-center top-0`}>
            <div id='js-settings-popup' className={`settings-popup rounded-lg flex flex-col justify-between dark:text-blue-50`}>
                <div className={`label h-12 mx-1 px-2 border-b dark:border-blue-450 text-2xl lg:text-xl`}>
                    <span>{settingElement.label}</span>
                    <button className={`js-btn-close relative bottom-2 right-4 lg:bottom-0 lg:right-0`}><i className={`text-5xl lg:text-2xl gf gf-close`} onClick={closeHandler}></i></button>
                </div>
                {description}
                <div className={`content ${this.type}`}>
                    {settingsForm}
                </div>
                <div className={`buttons h-24 lg:h-16 pt-3 px-4 mx-1 border-t dark:border-blue-450`}>
                    <div className={`mt-4 lg:mt-2 float-left text-3xl lg:text-base`}>
                        {settingsDisplay.arrangement.currentValue} <span className={`p-3 lg:p-2 dark:bg-blue-950 rounded-lg`}>{this.value}{settingElement['si']}</span>
                    </div>
                    <button className={`btn btn-green text-3xl lg:text-base float-right ml-4`}
                            onClick={() => {this.saveData(name, this.state.value, saveHandler, closeHandler, settingElement.global)}}>{saveCaption}</button>
                    <button className={`btn btn-empty float-right text-3xl lg:text-base`} onClick={closeHandler}>Zamknij</button>
                </div>
            </div>
        </div>)
    }
}


export default SettingsPopup;