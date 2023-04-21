import React from 'react';

class SettingsPopupRange extends React.Component {

    constructor(props) {
        super(props);
        this.range = this.props.range;
        this.thresholds = this.props.thresholds;
        this.step = Number.parseFloat(this.props.step);
        this.totalRange = this.range[1] - this.range[0];
        this.position = ((this.props.settingValue - this.range[0]) / this.totalRange * 100) + '%';
        this.thresholds = this.getThresholds();
    }

    state = {
        value: this.props.settingValue
    }

    changeValue (event) {
        this.position = ((event.target.value - this.range[0]) / this.totalRange * 100) + '%';
        this.props.sendData(event.target.value);
        this.setState({
            value: event.target.value
        });
    }

    btnChangeValue (adding) {
        let calculateValue;
        if (adding) {
            calculateValue = (Number.parseFloat(this.state.value) + this.step).toFixed(1);
        }
        else {
            calculateValue = (Number.parseFloat(this.state.value) - this.step).toFixed(1);
        }
        this.props.sendData(calculateValue);
        this.position = ((calculateValue - this.range[0]) / this.totalRange * 100) + '%';
        this.setState({
            value: calculateValue
        });
    }

    getThresholds () {
        let arr;
        if (this.thresholds) {
            this.thresholds.push(...this.range);
            arr = this.thresholds.map((value, key) => {
                return this.getThresholdsElement(value, key);
            });
        }
        else {
            arr = this.range.map((value, key) => {
                return this.getThresholdsElement(value, key);
            });
        }
        return arr;
    }

    getThresholdsElement (value, key) {
        let leftPosition = ((value - this.range[0]) / this.totalRange * 100) + '%';
        return <div key={key} className={`threshold`} style={{left: leftPosition}}>|<ins>{value}</ins></div>;
    }

    render() {
        return (<div className={`settings-range flex`}>
            <div className={`btn btn-side w-16 flex flex-col justify-center`}>
                <button className={`btn btn-change`} onClick={() => {this.btnChangeValue(false)}}><i className={`gf gf-minus`} ></i></button>
            </div>
            <div className={`select-bar flex-grow flex flex-col justify-center`}>
                <div className={`range-caption`}><div className={'value w-14 dark:bg-blue-450 rounded relative'} style={{left: this.position}}>{this.state.value}</div></div>
                <input
                    type='range'
                    onChange={this.changeValue.bind(this)}
                    min={this.range[0]}
                    max={this.range[1]}
                    step={this.step}
                    value={this.state.value}
                    className='range-slider'
                    id='range-slider'>
                </input>
                <div className="range-footer relative mt-4">
                    {this.thresholds.map((element) => element)}
                </div>
            </div>
            <div className={`btn btn-side w-16 flex flex-col justify-center`}>
                <button className={`btn btn-change`} onClick={() => {this.btnChangeValue(true)}}><i className={`gf gf-plus`}></i></button>
            </div>
        </div>)
    }
    componentDidMount() {
        let ins = document.querySelectorAll('div.threshold ins');
        ins.forEach(element => {
            element.style.left = -(element.offsetWidth / 3) + "px";
        });
    }
}

export default SettingsPopupRange;