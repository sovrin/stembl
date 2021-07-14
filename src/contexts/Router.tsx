import React, {createContext, createElement, useState} from 'react';
import {router} from 'services';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Router = ({routes, route: initialRoute, data: initialData}) => {
    const {register, fetch} = router();
    const [[route, data], setRoute] = useState([
        initialRoute,
        initialData,
    ]);

    register(routes);

    const [value, query] = fetch(route);

    const children = (
        value && createElement(value, {
            query,
            data,
        })
    );

    return (
        <Provider value={setRoute}>
            {children}
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.06.2021
 * Time: 22:45
 */
export default Router;
