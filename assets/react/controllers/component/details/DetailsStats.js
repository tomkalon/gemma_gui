import React from 'react';

class DetailsStats extends React.Component {

    render() {

        // props
        const stats = this.props.stats;

        // var
        return (<div className={`label stats px-4 float-right`}>
            <div className={`title ml-4 mr-3`}>Wykresy:</div>
            <div className="module dark:bg-blue-450 active"><i className="gf gf-stats"></i></div>
        </div>)
    }
}

export default DetailsStats;