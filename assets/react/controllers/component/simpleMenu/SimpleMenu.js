import React from 'react';
import "./simple-menu.scss"

class SimpleMenu extends React.Component {

    constructor(props) {
        super(props);
        this.facility = this.props.state;
        this.info = this.props.info;
    }

    getSensor(object, key) {
        let arr = [];
        let counter = 0;

        for (const [index, element] of Object.entries(object)) {
            if (element.value.length > 1) {

                element.value.map((value, i) => {
                    arr[counter] = <div key={key + '.' + index + '.' + i} className={`sensor w-48 pt-2 m-2 float-left text-center rounded-lg dark:border-gray-400`}>
                        <p className="text-3xl uppercase mb-1">{element.desc}</p>
                        <p className={`text-4xl py-2 value rounded-b-lg dark:text-darker-0`}><i className={`gf ${element.calculated[i].icon}`}></i> {value}{element.si}</p>
                    </div>;
                    counter++;
                });
            } else {
                arr[counter] = <div key={key + '.' + index} className={`sensor w-48 pt-2 m-2 float-left text-center rounded-lg dark:border-gray-400`}>
                    <p className="text-3xl uppercase mb-1">{element.desc}</p>
                    <p className={`text-4xl py-2 value rounded-b-lg dark:text-darker-0`}><i className={`gf ${element.calculated[0].icon}`}></i> {element.value[0]}{element.si}</p>
                </div>;
                counter++;
            }
        }

        return (arr);
    }

    render() {

        let img = 'default';
        const imagesSrc = '/build/images/';

        return (<div className={`simple-menu pt-4 px-4 mx-auto`}>
            {
                this.info.map((element, key) => {
                    return (<div key={key} className={'item mb-6 dark:bg-darker-100 rounded-xl cursor-pointer'}>
                        <div className={`label px-4 py-4 rounded-t-xl dark:bg-darker-800`}>
                            <span className={`dark:text-darker-100 text-4xl`}>Obiekt# {key + 1} | {element.name}</span>
                        </div>
                        <div className={`img m-4 float-left rounded-lg border-2 dark:border-darker-800`} style={{backgroundImage: `url("${imagesSrc}${img}.webp")` }}></div>
                        {this.getSensor(this.facility[key].readings, key)}
                    </div>);
                })
            }
        </div>);
    }
}

export default SimpleMenu;