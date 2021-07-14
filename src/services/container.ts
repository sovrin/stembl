import {Container} from "types/services";

/**
 *
 */
const factory = (): Container => {
    const dependency = {};

    /**
     *
     * @param fn
     * @returns {*}
     */
    const invoke = async function (fn: Function): Promise<any> {
        const matches = extract(fn);
        const match = matches[1];

        if (match === '') {
            return await fn.apply(null);
        }

        const deps = match.split(',')
            .map(name => name.trim())
            .map(name => get(name))
        ;

        return await fn.apply(null, deps);
    };

    /**
     *
     * @param fns
     */
    const pipe = async (...fns: Array<Function>): Promise<any> => {
        let context = null;

        for (let fn of fns) {
            if (context !== undefined) {
                fn = await invoke(fn);

                if (typeof fn === 'function') {
                    context = await fn(context);
                }

            } else {
                context = await invoke(fn);
            }
        }

        return context;
    };

    /**
     *
     * @param name
     * @returns {*}
     */
    const get = (name: string): any => {
        return dependency[name];
    };


    /**
     *
     * @param name
     * @param value
     */
    const set = (name: string | number, value: any): void => {
        dependency[name] = value;
    };

    /**
     *
     * @param name
     */
    const unset = (name: string | number): void => {
        delete dependency[name];
    };

    /**
     *
     * @param fn
     */
    const extract = (fn: Function): RegExpMatchArray => {
        const string = stringify(fn);

        return string.match(/\((.*?)\)/) || string.match(/(\w+)/);
    };

    /**
     *
     * @param fn
     * @returns {string}
     */
    const stringify = (fn: Function): string => (
        Function.prototype.toString.call(fn)
    );

    /**
     *
     */
    const context = () => ({
            invoke,
            pipe,
            get,
            set,
            unset,
        }
    );

    return context();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.08.2020
 * Time: 17:58
 */
export default factory;
