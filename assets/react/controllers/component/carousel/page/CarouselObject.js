import React from 'react';
import CarouselSensor from "./CarouselSensor";

class CarouselObject extends React.Component {

    render() {

        // props
        const num = this.props.num; // rendered object number
        const current = this.props.current; // current object
        const state = this.props.itemState;
        const info = this.props.itemInfo;
        const boxSize = info.display.size;
        const readings = state.readings;
        const handler = this.props.handler;
        let isActive;
        if (num === current) {
            isActive = 'active';
        }


        return (<div onClick={() => handler(num)}
                     className={`item ${boxSize} ${isActive} bg-gradient-to-br dark:from-darker-100 dark:to-darker-200 
                     rounded-md cursor-pointer shadow-md dark:shadow-gray-900/30`}>
            <div
                className={`label w-auto rounded-t-md uppercase border-b dark:border-darker-300 dark:bg-darker-700 dark:text-darker-100`}>
                <span>{info.name}</span><span className={`alert`}>
                {/*<i className={`gf gf-damage`}></i><i*/}
                {/*className={`gf gf-warning`}></i>*/}
                </span>
            </div>
            <div className={`box uppercase`}>
                <div className={`inner`}>
                    {Object.entries(readings).map(([index, item]) => {
                        if (Array.isArray(item.value)) {
                            if (item.value.length === 1) {
                                return (<CarouselSensor key={index} si={readings[index].si} value={readings[index].value[0]}
                                                        icon={readings[index].calculated[0].icon} desc={item.desc}/>);
                            } else {
                                let arr = readings[index].value.map((element, i) => <CarouselSensor key={index + '_' + i}
                                                                                                    si={readings[index].si}
                                                                                                    value={readings[index].value[i]}
                                                                                                    icon={readings[index].calculated[i].icon}
                                                                                                    desc={item.desc}/>)
                                return (arr);
                            }
                        }
                    })}
                </div>
            </div>
        </div>)
    }
}

export default CarouselObject;