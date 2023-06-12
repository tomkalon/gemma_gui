import React from 'react';
import '../../../common/common.scss'

class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.closeHandler = this.props.closeHandler;
    }

    render() {
        const data = this.props.data;
        const name = this.props.name;

        let content = [];
        if (typeof data === 'object') {
            content = data;
        } else {
            content[0] = data;
        }

        return (<div key={name} className={`js-popup-cover z-50 lg:z-30 fixed flex justify-center items-center top-0`}>
            <div className={`js-popup rounded-lg flex flex-col justify-between dark:text-blue-50`}>
                <div className={`label h-12 mx-1 px-2 border-b dark:border-blue-450 text-2xl lg:text-xl`}>
                    <span>{name} <i className={`gf gf-${this.props.icon}`}></i></span>
                    <button className={`js-btn-close relative bottom-2 right-4 lg:bottom-0 lg:right-0`}>
                        <i className={`text-5xl lg:text-2xl gf gf-close`} onClick={() => {
                            this.closeHandler()
                        }}></i>
                    </button>
                </div>
                <div className={`px-3 pb-3 pt-1`}>{content.map((element) => {
                    return element;
                })}</div>
            </div>
        </div>);
    }
}

export default Popup;