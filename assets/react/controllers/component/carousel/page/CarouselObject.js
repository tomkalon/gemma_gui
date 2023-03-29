import React from 'react';
import CarouselSensor from "./CarouselSensor";

class CarouselObject extends React.Component {

    render() {
        let state = this.props.itemState;
        let info = this.props.itemInfo;
        let boxSize = info.display.size;
        let readings = state.readings;

        console.log(readings);

        return (<div
            className={`item ${boxSize} bg-gradient-to-br dark:from-darker-100 dark:to-darker-200 rounded-md cursor-pointer shadow-md dark:shadow-gray-900/30`}>
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
                        console.log('');
                        if (Array.isArray(item.value)) {
                            if(item.value.length === 1) {
                                return (<CarouselSensor key={index} si={readings[index].si}/>);
                            }
                            else {
                                return (<CarouselSensor key={index} si={readings[index].si}/>);
                            }
                        } else {
                            return (<CarouselSensor key={index} si={readings[index].si}/>);
                        }
                    })}
                </div>
            </div>
        </div>)
    }
}

export default CarouselObject;

// {Object.entries(readings).map(([key, item]) => {
//     if(Array.isArray(item.value)) {
//         if (item.value.length > 1) {
//
//         } else {
//             return (<div key={key}>
//                 <i className={`gf ${item.calculated[0].icon}`}></i>
//                 <p><span>°C</span></p>
//             </div>)
//         }
//     }
//     else {
//         return (<div key={key}>
//             <i className={`gf ${item.calculated[0].icon}`}></i>
//             <p><span>°C</span></p>
//         </div>)
//     }
//
//
// })}