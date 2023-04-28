import React from 'react';

class DetailsModules extends React.Component {

    render() {

        // props
        const heat = this.props.heat;
        const blow = this.props.blow;

        // var and blocks
        let heatActive, blowActive, heatBlock, blowBlock;
        if (heat) {
            if (heat.boolValue === true) heatActive = 'active';
            heatBlock = <div className={`module dark:bg-blue-450 ${heatActive}`}><i className={`gf ${heat.icon[1]}`}></i></div>;
        }
        if (blow) {
            if (blow.boolValue === true) blowActive = 'active';
            blowBlock = <div className={`module dark:bg-blue-450 ${blowActive}`}><i className={`gf ${blow.icon[1]}`}></i></div>;
        }

        return (<div className={`label other px-4 float-right`}>
            {blowBlock}
            {heatBlock}
        </div>)
    }
}

export default DetailsModules;