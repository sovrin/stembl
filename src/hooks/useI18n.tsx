import {useContext, useMemo} from 'react';
import {Context as I18n} from 'contexts/I18n';

/**
 *
 * @param target
 * @param parameters
 * @param memo
 */
const useI18n = (target = null, parameters = {}, memo = true): any => {
    const {resolve} = useContext(I18n);

    /**
     *
     * @param snippet
     * @param parameter
     */
    const build = (snippet, parameter) => {
        if (typeof snippet === 'function') {
            return (params) => {
                const computed = snippet(params);

                return build(computed, parameter);
            };
        } else if (Array.isArray(snippet)) {
            [snippet, parameter] = snippet;
        }

        return resolve(snippet, parameter);
    };

    /**
     *
     * @param key
     * @param keys
     * @param parameters
     */
    const extract = (key, keys, parameters) => {
        const {[key]: cursor} = keys;
        const {[key]: parameter} = parameters;

        return build(cursor, parameter);
    };

    /**
     *
     * @param target
     */
    const process = (target) => {
        const processed = {};

        for (const key in target) {
            if (!target.hasOwnProperty(key)) {
                continue;
            }

            processed[key] = extract(key, target, parameters);
        }

        return processed;
    };

    if (typeof target === 'function') {
        return (key) => resolve(target(key), parameters);
    }

    const snippets = memo
        ? useMemo(() => process(target), [target, parameters])
        : process(target)
    ;

    return {
        resolve,
        ...snippets,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 04.02.2020
 * Time: 20:28
 */
export default useI18n;
