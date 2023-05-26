import React from 'react';
import "./simple-menu.scss"
import display from '../../../common/settings-display.json'

class SimpleMenu extends React.Component {

    constructor(props) {
        super(props);
        this.facility = this.props.state;
        this.info = this.props.info;
        this.handler = this.props.linkHandler;
        this.numberOfObjects = this.props.numberOfObjects;
        this.single = this.props.single;
        this.indicatorIcons = this.props.indicatorIcons;
        this.objectsId = this.props.objectsId;
    }

    getSensor(object, key) {
        let arr = [];
        let counter = 0;

        for (const [index, element] of Object.entries(object)) {
            if (element.value.length > 1) {
                element.value.map((value, i) => {
                    arr[counter] = <div key={key + '.' + index + '.' + i}
                                        className={`sensor w-52 pt-2 m-2 text-center rounded-lg dark:border-gray-400`}>
                        <p className="text-3xl uppercase mb-1">{element.desc}</p>
                        <p className={`text-4xl py-2 value rounded-b-lg dark:text-darker-0`}><i
                            className={`gf ${element.calculated[i].icon}`}></i> {value}{element.si}</p>
                    </div>;
                    counter++;
                });
            } else {
                arr[counter] =
                    <div key={key + '.' + index} className={`sensor w-52 pt-2 m-2 text-center rounded-lg dark:border-gray-400`}>
                        <p className="text-3xl uppercase mb-1">{element.desc}</p>
                        <p className={`text-4xl py-2 value rounded-b-lg dark:text-darker-0`}><i
                            className={`gf ${element.calculated[0].icon}`}></i> {element.value[0]}{element.si}</p>
                    </div>;
                counter++;
            }
        }
        return (arr);
    }

    getBtn = function (icon, isActive, target, handler) {
        let color = 'dark:text-darker-100';
        if (!isActive) {
            color = 'dark:text-darker-700';
            return <button className={`item w-28 text-8xl float-left mx-4 mt-2 ${color}`}>
                <i className={`gf ${icon}`}></i>
            </button>;
        } else {
            return <button className={`item w-28 text-8xl float-left mx-4 mt-2 ${color}`} onClick={() => {
                handler(target, '')
            }}>
                <i className={`gf ${icon}`}></i>
            </button>;
        }
    }

    render() {
        let prevBtn;
        let nextBtn;
        let order;

        return (<div className={`simple-menu px-4`}>
            {this.info.map((element, key) => {
                let background = 'dark:bg-darker-200';
                const indicators = this.indicatorIcons(this.facility[key].indicators);
                order = Number.parseInt(this.info[key].order);
                if (this.single) {
                    const currentObject = this.objectsId.indexOf(this.info[0].id);
                    if (this.info[key].order === 1) {
                        prevBtn = this.getBtn('gf-dir-w', false);
                        if (this.info[key].order < this.numberOfObjects) {
                            nextBtn = this.getBtn('gf-dir-e', true, this.objectsId[currentObject + 1], this.handler);
                        }
                    } else {
                        prevBtn = this.getBtn('gf-dir-w', true, this.objectsId[currentObject - 1], this.handler);
                        if (this.info[key].order < this.numberOfObjects) {
                            nextBtn = this.getBtn('gf-dir-e', true, this.objectsId[currentObject + 1], this.handler);
                        } else {
                            nextBtn = this.getBtn('gf-dir-e', false);
                        }
                    }
                }

                if (key % 2) {
                    background = 'dark:bg-darker-300';
                }
                if (this.single !== true) {
                    return (<div key={key} className={`object mb-10 ${background} cursor-pointer`} onClick={() => {
                        this.handler(key, '')
                    }}>
                        <div className={`label px-4 py-4 dark:bg-darker-800`}>
                            <span
                                className={`dark:text-darker-100 text-4xl`}>{display.arrangement.objectNo} {element.order} | {element.name}</span>
                            <span className={`dark:text-sky-200 pl-4 text-4xl`}>{indicators['sensor']}</span>
                            <span className={`dark:text-sky-200 pl-4 text-4xl`}>{indicators['hardware']}</span>
                        </div>
                        <div className={`px-2 py-4 flex flex-wrap`}>
                            {this.getSensor(this.facility[key].readings, key)}
                        </div>
                    </div>);
                } else {
                    return (<div key={key} className={`object ${background} cursor-pointer`}>
                        <div className={`label px-4 py-4 dark:bg-darker-800`}>
                            <span
                                className={`dark:text-darker-100 text-4xl`}>{display.arrangement.objectNo} {element.order} | {element.name}</span>
                            <span className={`dark:text-sky-200 pl-4 text-4xl`}>{indicators['sensor']}</span>
                            <span className={`dark:text-sky-200 pl-4 text-4xl`}>{indicators['hardware']}</span>
                        </div>
                        <div className={`px-2 py-4 flex flex-wrap`}>
                            {this.getSensor(this.facility[key].readings, key)}
                        </div>
                        <div className={`w-full dark:bg-darker-600 p-4`}>
                            <button className={`btn btn-lg btn-green dark:text-darker-100`}
                                    onClick={() => {
                                        this.handler(this.info[0].id, 'setup')
                                    }}>
                                {display.arrangement.objectSetup}
                            </button>
                        </div>
                    </div>);
                }
            })}

            <div className={`fixed bottom-menu bottom-0 h-28 px-10 py-1 w-full border-t dark:border-darker-200
             bg-gradient-to-b dark:from-darker-900 dark:to-darker-800`}>
                <button className={`dark:text-darker-100 text-8xl float-left mr-20`} onClick={() => {
                    this.handler('', '')
                }}><i className="gf gf-home"></i></button>
                {prevBtn}{nextBtn}
                <button className={`dark:text-darker-100 text-8xl float-right`} onClick={() => {
                    document.querySelector('#nav').classList.toggle('open');
                }}><i className="gf gf-menu"></i></button>
            </div>
        </div>);
    }
}

export default SimpleMenu;