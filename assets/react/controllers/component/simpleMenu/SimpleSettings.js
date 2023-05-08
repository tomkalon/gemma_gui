import React from 'react';
import "./simple-menu.scss"

class SimpleSettings extends React.Component {

    constructor(props) {
        super(props);
        this.currentObject = this.props.currentObject;
        this.selectedSettings = this.props.selectedSettings;
        this.saveHandler = this.props.saveHandler;
        this.settingsHandler = this.props.settingsHandler;
        this.global = this.props.global;
        this.id = this.props.id;
    }

    render() {
        return (<div className={`simple-settings`}>
            <div>
                <div className={`label px-4 py-4 dark:bg-darker-800`}>
                    <span className={`dark:text-darker-100 text-4xl`}>Ustawienia</span>
                </div>
            </div>
            <div className={`settings-menu fixed flex bottom-40 h-24 w-full border-t dark:border-darker-200 bg-gradient-to-b dark:from-darker-800 dark:to-darker-700`}>
            </div>
        </div>);
    }
}

export default SimpleSettings;