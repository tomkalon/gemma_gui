import React from 'react';

class CarouselSensor extends React.Component {
    render() {
        let si = this.props.si;
        let icon = this.props.icon;
        let value = this.props.value;

        return (<div>
            <i className={`gf ${icon}`}></i>
            <p><span>{value}{si}</span></p>
        </div>)
    }
}

export default CarouselSensor;


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