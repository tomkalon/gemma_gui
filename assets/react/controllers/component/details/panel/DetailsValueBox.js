import React from 'react';

class DetailsValueBox extends React.Component {
    render() {

        // props
        const sensor = this.props.sensor;
        const diff = this.props.diff;
        const si = this.props.si;

        // components
        let valueList;
        let active;

        if (diff.length) {
            valueList = sensor.value.map((element, index) =>
                <div key={index} className={`box`}>
                    <span><i className={`gf ${sensor.calculated[index].icon}`}></i>{element}{si}</span>
                    <p className={`diff`}>{diff[index]}{si}</p>
                </div>
            );
        }
        else {
            valueList = sensor.value.map((element, index) =>
                <div key={index} className={`box`}>
                    <span><i className={`gf ${sensor.calculated[index].icon}`}></i>{element}{si}</span>
                </div>
            );
        }

        return (
            <div className={`value flex dark:bg-blue-550`}>
                {valueList}
            </div>
        )
    }
}

export default DetailsValueBox;