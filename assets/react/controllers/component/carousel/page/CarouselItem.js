import React from 'react';

class CarouselItem extends React.Component {

    render() {
        return (<div
                className={`item bg-gradient-to-br dark:from-darker-100 dark:to-darker-200 rounded-md cursor-pointer shadow-md dark:shadow-gray-900/30`}>
                <div
                    className={`label w-auto rounded-t-md uppercase border-b dark:border-darker-300 dark:bg-darker-700 dark:text-darker-100`}>
                    <span>NAZWA OBIEKTU</span><span className={`alert`}><i className={`gf gf-damage`}></i><i
                    className={`gf gf-warning`}></i></span>
                </div>
                <div className={`box uppercase`}>
                    <div className={`inner`}>
                        {/*{this.props.object}*/}
                    </div>
                </div>
            </div>)
    }
}

export default CarouselItem;