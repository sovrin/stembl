import React, {createContext} from 'react';
import parser from 'micro-ap';
import commands from 'commands';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @constructor
 */
const Backend = ({children}) => {
    const parse = parser(process.argv)
        .command(/[a-z]+/)
        .command('help')
    ;
    const args = parse.get() as any;
    const route = Object.keys(args)
        .find((key) => args[key] === true) || 'help'
    ;

    const command = commands.find(({command}) => command === route);

    if (command) {
        const {flags} = command;

        for (const [key, flag] of flags) {
            parse.flag(key, flag);
        }
    }

    const data = {
        commands,
        args: parse.get(),
    };

    const value = {
        route,
        data,
    };

    return (
        <Provider value={value}>
            {children(value)}
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.07.2021
 * Time: 17:40
 */
export default Backend;
