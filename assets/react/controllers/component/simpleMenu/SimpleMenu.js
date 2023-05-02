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
                    arr[counter] = <div key={key + '.' + index + '.' + i} className={`sensor w-48 pt-2 m-2 text-center rounded-lg dark:border-gray-400`}>
                        <p className="text-3xl uppercase mb-1">{element.desc}</p>
                        <p className={`text-4xl py-2 value rounded-b-lg dark:text-darker-0`}><i className={`gf ${element.calculated[i].icon}`}></i> {value}{element.si}</p>
                    </div>;
                    counter++;
                });
            } else {
                arr[counter] = <div key={key + '.' + index} className={`sensor w-48 pt-2 m-2 text-center rounded-lg dark:border-gray-400`}>
                    <p className="text-3xl uppercase mb-1">{element.desc}</p>
                    <p className={`text-4xl py-2 value rounded-b-lg dark:text-darker-0`}><i className={`gf ${element.calculated[0].icon}`}></i> {element.value[0]}{element.si}</p>
                </div>;
                counter++;
            }
        }

        return (arr);
    }

    render() {
        return (<div className={`simple-menu pt-4 px-4`}>
            {this.info.map((element, key) => {
                    let background = 'dark:bg-darker-200';
                    if (key % 2) {
                        background = 'dark:bg-darker-300';
                    }
                    return (<div key={key} className={`item mb-10 ${background} cursor-pointer`}>
                        <div className={`label px-4 py-4 dark:bg-darker-800`}>
                            <span className={`dark:text-darker-100 text-4xl`}>Obiekt# {key + 1} | {element.name}</span>
                        </div>
                        <div className={`px-2 py-4 flex flex-wrap`}>
                            {this.getSensor(this.facility[key].readings, key)}
                        </div>
                    </div>);
                })}
            <div className={`fixed bottom-0 h-32 w-full ring-offset-8 ring-8 dark:ring-black dark:bg-darker-900`}></div>
        </div>);
    }
}

export default SimpleMenu;