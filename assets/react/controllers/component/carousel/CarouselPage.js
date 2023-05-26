import React from 'react';

class CarouselPage extends React.Component {

    render() {

        // props
        const facilityState = this.props.objectsState;
        const facilityInfo = this.props.objectsInfo;
        const current = this.props.current;
        const page = this.props.page;
        const pages = this.props.pages;
        const maxRow = this.props.maxRow;
        const indicatorIcons = this.props.indicators;
        const handler = this.props.handler;

        function getObject(key, current, state, info, handler) {
            // var
            let isActive;
            if (key === current) {
                isActive = 'active';
            }

            // alert indicators
            let indicators = indicatorIcons(state.indicators);
            let sensorAlert;
            if (state['settings']) {
                sensorAlert = indicators['sensor'];
            }

            const sensors = (key, icon, value, si, desc) => {
                return (<div key={key}>
                    <i className={`gf ${icon}`}></i>
                    <p>{value}{si}</p>
                    <p className="desc">{desc}</p>
                </div>);
            }

            return (<div key={key} onClick={() => handler(key, 200)}
                         className={`item ${info.display.size} ${isActive} bg-gradient-to-br dark:from-darker-100 dark:to-darker-200 
                     rounded-md cursor-pointer shadow-md dark:shadow-gray-900/30`}>
                <div
                    className={`label w-auto rounded-t-md uppercase border-b dark:border-darker-300 dark:bg-darker-700 dark:text-darker-100`}>
                    <div className={`overflow-ellipsis whitespace-nowrap overflow-hidden`}>{info.name}</div>
                    <div className={`alert min-w-max`}>
                    {sensorAlert}{indicators['hardware']}
            </div>
                </div>
                <div className={`box uppercase`}>
                    <div className={`inner`}>
                        {Object.entries(state.readings).map(([index, item]) => {
                            if (Array.isArray(item.value)) {
                                if (item.value.length === 1) {
                                    return sensors(index, state.readings[index].calculated[0].icon, state.readings[index].value[0], state.readings[index].si, item.desc);
                                } else {
                                    let arr = state.readings[index].value.map((element, i) => sensors(index + '_' + i, state.readings[index].calculated[i].icon, state.readings[index].value[i], state.readings[index].si, item.desc));
                                    return (arr);
                                }
                            }
                        })}
                    </div>
                </div>
            </div>);
        }

        return (<div className={`carousel-content ${maxRow}`}>
            <div className={`row`} id={`js-carousel-content`}>
                {pages[page].map(function (index) {
                    return (getObject(index, current, facilityState[index], facilityInfo[index], handler));
                })}
            </div>
        </div>)
    }
}

export default CarouselPage;