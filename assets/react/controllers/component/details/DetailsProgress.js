import React from 'react';

class DetailsProgress extends React.Component {

    render() {

        // props
        const vent = this.props.vent;
        const shadow = this.props.shadow;
        const settings = this.props.settings;
        const description = this.props.description;

        // vars
        let descriptionBlock;
        let rounded = '';
        if (description) {
            descriptionBlock = <div className={`p-4`}>
                <div className={`p-4 rounded dark:bg-blue-950`}>{description}</div>
            </div>;
        }

        if (settings) {
            rounded = '-t';
        }

        function renderProgressBar(value, si, indicator) {

            let arr = value.map((element, index) => {
                return (<div key={index} className={`shadow progress w-full dark:bg-blue-550 h-6 mr-4`}>
                        <div className={`value flex dark:bg-darker-350 leading-none h-6`}
                             style={{width: `${element}%`}}>{element}{si}
                        </div>
                        <div
                            className={`indicator flex bg-gradient-to-r dark:from-transparent-0 dark:to-darker-100/20
                             leading-none h-6`}
                            style={{width: `${indicator}%`}}>
                        </div>
                    </div>)
            })
            return (<div className={`row flex w-full`}>{arr}</div>);
        }

        function renderProgressRow(type, settings) {
            let indicatorValue;
            let name = type.desc;
            if (type.name === 'vent' && settings) {
                indicatorValue = settings.vent;
            } else if (type.name === 'shadow' && settings) {
                indicatorValue = settings.shadow;
            }

            let progressArray = renderProgressBar(type.value, type.si, indicatorValue);

            return (<div className={`box flex w-full`}>
                <div className={`label`}><span>{name}</span></div>
                {progressArray}
            </div>);
        }

        // var
        let progressRows = [];
        if (vent) progressRows[0] = renderProgressRow(vent, settings);
        if (shadow) progressRows[1] = renderProgressRow(shadow, settings);

        return (<div
            className={`readings stripe dark:bg-blue-960 dark:border-darker-200 dark:text-blue-100 rounded${rounded} shadow-md dark:shadow-gray-900/30`}>
            <div className={`container mx-auto px-4 flex text-blue-100 text-center`}>
                {progressRows.map((element, index) => (
                    <div key={index} className={`box flex w-full`}>
                        {element}
                    </div>
                ))}
            </div>
            {descriptionBlock}
        </div>)
    }
}

export default DetailsProgress;