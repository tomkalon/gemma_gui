import React from 'react';

class SettingsPopupRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 100
        };
    }

    setValue (event) {
        console.log(event.target.value);
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (<div className={`settings-range flex`}>
            <div className={`btn btn-side w-16 flex flex-col justify-center`}>
                <button className={`btn btn-change`}><i className={`gf gf-minus`}></i></button>
            </div>
            <div className={`select-bar flex-grow flex flex-col justify-center`}>
                <input
                    type='range'
                    onChange={this.setValue.bind(this)}
                    min={1}
                    max={400}
                    step={1}
                    value={this.state.value}
                    className='range'>
                </input>
            </div>
            <div className={`btn btn-side w-16 flex flex-col justify-center`}>
                <button className={`btn btn-change`}><i className={`gf gf-plus`}></i></button>
            </div>
        </div>)
    }
}

export default SettingsPopupRange;