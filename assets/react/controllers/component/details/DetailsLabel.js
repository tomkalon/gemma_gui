import React from 'react';

class DetailsLabel extends React.Component {

    render() {

        // props
        const current = this.props.current;
        const name = this.props.name;

        return (<div
                className={`h-8 bg-gradient-to-br dark:from-blue-950 dark:to-blue-960 border-b border-t dark:border-blue-450 flex rounded-md shadow-md relative dark:shadow-gray-900/30`}>
                <div className={`label w-full px-4 container mx-auto text-sm`}>
                    <span className={`dark:text-darker-0 pr-4`}>Obiekt #{current}</span>
                    <span className={`dark:text-sky-200 border-l dark:border-darker-100 pl-4`}>{name}</span>
                </div>
            </div>)
    }
}

export default DetailsLabel;