import {basename, extname, resolve} from 'path';
import {readdirSync, statSync} from 'fs';
import {Io} from '../types/services';

/**
 *
 */
const factory = (): Io => {

    /**
     *
     * @param module
     */
    const load = (module: string) => {
        delete require.cache[require.resolve(module)];
        let target = require(module);

        if (target.default) {
            target = target.default;
        }

        return target;
    };

    /**
     *
     * @param path
     * @param filter
     * @param processor
     */
    const traverse = (path: string, filter?: string, processor?: Function) => {
        const absolute = resolve(path);
        const result = [];

        /**
         *
         * @param name
         */
        const bind = (name: string) => {
            const pointer = resolve(absolute, name);

            if ((statSync(pointer)).isDirectory()) {
                const traversed = traverse(pointer, filter, processor);

                return result.push(...traversed);
            }

            if (filter && extname(pointer) !== filter) {
                return result;
            }

            let entry = {
                name: (filter && basename(name, '.ts')) || name,
                absolute: resolve(absolute, name),
                ext: extname(name),
            } as any;

            if (processor) {
                const module = processor(pointer);

                entry = {
                    ...entry,
                    module,
                };
            }

            result.push(entry);

            return result;
        };

        for (const file of readdirSync(path)) {
            bind(file);
        }

        return result;
    };

    return {
        traverse,
        load,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.07.2021
 * Time: 19:22
 */
export default factory;
