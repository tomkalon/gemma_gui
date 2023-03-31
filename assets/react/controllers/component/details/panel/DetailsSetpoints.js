import React from 'react';

class DetailsSetpoints extends React.Component {

    render() {

        return (<div className={`border-l dark:border-darker-100`}>
            <span className={`pre px-4`}>Zadana</span>
            <span className={`post pr-4 active`}><i className={`gf gf-day rotate`}></i>19.5°C</span>
            <span className={`post`}><i className={`gf gf-night`}></i>26.5°C</span>
        </div>)
    }
}

export default DetailsSetpoints;