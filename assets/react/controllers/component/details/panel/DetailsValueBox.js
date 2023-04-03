import React from 'react';

class DetailsValueBox extends React.Component {

    render() {

        return (<div className={`box`}>
            <span><i className={`gf gf-temp2`}></i>21.5°C</span>
            <p className={`diff`}>+2°C</p>
        </div>)
    }
}

export default DetailsValueBox;