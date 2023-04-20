import React from 'react';

class SettingsPopupRange extends React.Component {

    constructor(props) {
        super(props);
        this.range = this.props.range;
        this.step = this.props.step;
        this.state = {
            value: this.props.settingValue
        };
        this.totalRange = this.range[1] - this.range[0];
        this.position = ((this.props.settingValue - this.range[0]) / this.totalRange * 100) + '%';
    }

    setValue (event) {
        this.position = ((event.target.value - this.range[0]) / this.totalRange * 100) + '%';
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
                <div className={`range-caption`}><div className={'value w-14 dark:bg-blue-450 rounded relative'} style={{left: this.position}}>{this.state.value}</div></div>
                <input
                    type='range'
                    onChange={this.setValue.bind(this)}
                    min={this.range[0]}
                    max={this.range[1]}
                    step={this.step}
                    value={this.state.value}
                    className='range-slider'
                    id='range-slider'>
                </input>
                <div className="range-footer relative">
                    <div className={`threshold`} style={{left: '0%'}}>|<ins>-20</ins></div>
                    <div className={`threshold`} style={{left: '100%'}}>|<ins>120</ins></div>
                </div>
            </div>
            <div className={`btn btn-side w-16 flex flex-col justify-center`}>
                <button className={`btn btn-change`}><i className={`gf gf-plus`}></i></button>
            </div>
        </div>)
    }
}

export default SettingsPopupRange;