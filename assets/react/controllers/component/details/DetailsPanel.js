import React from 'react';
import DetailsSetpoints from "./panel/DetailsSetpoints";

class DetailsPanel extends React.Component {

    render() {
        let shortName = this.props.shortName;
        let fullName = this.props.fullName;
        let data = this.props.data;

        return (
            <div className={`readings chunk`}>
                <div className={`flex flex-col dark:text-blue-100 text-center uppercase`}>
                    <div className={`heading label text-sm px-4 h-10 dark:bg-blue-950 border-b border-t dark:border-blue-450`}>
                        <span className={`title pr-4`}>{fullName}</span>
                        <DetailsSetpoints />
                    </div>
                    <div className={`value flex dark:bg-blue-550`}>
                        <div className={`box`}>
                            <span><i className={`gf gf-temp2`}></i>21.5°C</span>
                            <p className={`diff`}>+2°C</p>
                        </div>
                    </div>
                    <div className={`amplitude flex dark:bg-blue-550 border-t border-b-2 dark:border-blue-450`}>
                        <div className={`box`}>
                            <div className={`value`}><span><i className={`gf gf-temp2`}></i>5.5°C</span></div>
                            <div className={`label text-left`}>
                                <span>{shortName}</span>
                                <p className={`dark:text-blue-300`}>min</p>
                            </div>
                        </div>
                        <div className={`box`}>
                            <div className={`value`}><span><i className={`gf gf-temp6`}></i>27.3°C</span></div>
                            <div className={`label text-left`}>
                                <span>{shortName}</span>
                                <p className={`dark:text-red-300`}>max</p>
                            </div>
                        </div>
                    </div>
                    {/*<ul className={`additional settings label gap-0.5 h-14 dark:bg-blue-950 border-b dark:border-blue-450`}>*/}
                    {/*    <li className={`title`}>Ustawienia obiektu:</li>*/}
                    {/*    <li className={`element active`}>*/}
                    {/*        <i className={`gf gf-temp3 text-red-500`}></i>*/}
                    {/*        <p>Temperatura</p>*/}
                    {/*    </li>*/}
                    {/*    <li className={`element`}>*/}
                    {/*        <i className={`gf gf-humidity text-sky-300`}></i>*/}
                    {/*        <p>Wilgotność</p>*/}
                    {/*    </li>*/}
                    {/*    <li className={`element`}>*/}
                    {/*        <i className={`gf gf-vent3 text-lime-500`}></i>*/}
                    {/*        <p>Wietrznik</p>*/}
                    {/*    </li>*/}
                    {/*    <li className={`element`}><i className={`gf gf-shadow text-amber-300`}></i>*/}
                    {/*        <p>Cieniówka</p>*/}
                    {/*    </li>*/}
                    {/*    <li className={`element`}>*/}
                    {/*        <i className={`gf gf-manual text-cyan-500`}></i>*/}
                    {/*        <p>Pozostałe</p>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
            </div>
        )
    }
}

export default DetailsPanel;