import React from 'react';

class SettingsPopup extends React.Component {

    render() {

        // props

        return (<div className={`js-popup-cover z-40 fixed flex justify-center items-center top-0`}>
            <div id='js-settings-popup' className={`settings-popup rounded-lg flex flex-col justify-between dark:text-blue-50`}>
                <div className={`label h-12 mx-1 px-2 border-b dark:border-blue-450`}>
                    <span>Temperatura bezwzględnego zamknięcia wietrznika</span>
                    <span className={`js-btn-close`}><i className={`gf gf-close`}></i></span>
                </div>
                <div className={`content flex-grow flex`}>
                    <div className={`btn btn-side w-16 flex flex-col justify-center`}>
                        <button className={`btn btn-change`}><i className={`gf gf-minus`}></i></button>
                    </div>
                    <div className={`select-bar flex-grow`}></div>
                    <div className={`btn btn-side w-16 flex flex-col justify-center`}>
                        <button className={`btn btn-change`}><i className={`gf gf-plus`}></i></button>
                    </div>
                </div>
                <div className={`buttons h-16 pt-3 px-4 mx-1 border-t dark:border-blue-450`}>
                    <button className={`btn btn-save float-right ml-4`}>Zapisz</button>
                    <button className={`btn btn-cancel float-right`}>Zamknij</button>
                </div>
            </div>
        </div>)
    }
}

export default SettingsPopup;