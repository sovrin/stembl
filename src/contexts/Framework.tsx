import React, {createContext} from 'react';
import parser from 'micro-ap';
import {resolve} from 'path';
import {
    container as containerFactory,
    io as ioFactory,
} from '../services';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @constructor
 */
const Framework = ({children}) => {
    const container = containerFactory();
    const io = ioFactory();

    container.set('help', () => {});
    container.set('flags', () => {});

    const parse = parser(process.argv)
        .command(/[a-z]+/)
        .command('help')
    ;
    const path = resolve(__dirname, '..', 'commands');
    const args = parse.get() as any;

    const commands = io.traverse(path, '.ts', io.load);

    let route = Object.keys(args)
        .find((key) => args[key] === true)
    ;

    let data;

    if (route) {
        const {module} = commands.find(({name}) => name === route);

        container.set('flags', (flags) => {
            for (const [key, flag] of flags) {
                parse.flag(key, flag);
            }
        });

        // fetch flags
        container.invoke(module).then();

        container.set('flags', () => {});
        container.set('args', parse.get());

        // run command
        data = container.invoke(module).then();
    } else {
        route = 'help';
        data = [];

        for (const {module, name} of commands) {
            container.set('help', (text) => {
                container.invoke(() => data.push([name, text])).then();
            });

            container.invoke(module).then();
        }
    }

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
export default Framework;
