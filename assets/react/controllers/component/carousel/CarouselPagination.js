import React from 'react';

class CarouselPagination extends React.Component {
    render() {

        // props
        const active = this.props.active;
        const handler = this.props.handler;

        return (<div className={`mt-6 py-2 gap-x-6 flex flex-grow justify-center`}>
            {this.props.pagination.map(function (value, index) {
                if (active === index) {
                    return (<div key={index} className={'item active'}>
                        <span>{value}</span>
                    </div>)
                }
                else {
                    return (<div key={index} className={'item'} onClick={() => handler(index)}>
                        <span>{value}</span>
                    </div>)
                }
            })}
        </div>)
    }
}

export default CarouselPagination;