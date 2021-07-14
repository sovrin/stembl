import React, {createContext, useRef, useState} from 'react';
import vano, {file} from 'vano';
import * as collections from 'collections';
import {STORAGE_FOLDER} from 'const';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @constructor
 */
const Database = ({children}) => {
    const [db] = useState(() => vano({
        adapter: file(STORAGE_FOLDER),
    }));

    const cache = useRef({});

    /**
     *
     * @param name
     */
    const bootstrap = (name) => {
        if (!cache.current[name]) {
            cache.current[name] = collections[name](db);
        }

        return cache.current[name];
    };

    const context = {
        bootstrap,
    };

    return (
        <Provider value={context}>
            {children}
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 22:57
 */
export default Database;
