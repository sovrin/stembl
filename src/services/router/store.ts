const VARIABLE = ':';
const PATH = '/';
const WILDCARD = '*';

export const FN = Symbol.for('fn');

/**
 *
 */
const factory = () => {
    const stack = {};

    /**
     *
     * @param path
     */
    const tokenize = (path: string): Array<string> => (
        ['$', path].join(PATH)
            .split(PATH)
            .filter(Boolean)
    );

    /**
     *
     * @param stack
     */
    const keys = (stack) => (
        Object.keys(stack)
    );

    /**
     *
     * @param tokens
     * @param func
     * @param stack
     */
    const up = (tokens, func, stack) => {
        const token = tokens.shift();

        if (!token) {
            return true;
        }

        if (!stack[token]) {
            stack[token] = {};
        }

        if (tokens.length === 0) {
            stack[token][FN] = func;
        }

        return up(tokens, func, stack[token]);
    };

    /**
     *
     * @param tokens
     * @param stack
     */
    const down = (tokens, stack) => {
        let token = tokens.shift();

        if (!token) {
            return stack[FN];
        } else if (stack[WILDCARD]) {
            if (stack[WILDCARD][FN]) {
                return stack[WILDCARD][FN];
            }

            return down(tokens, stack[WILDCARD]);
        } else if (!stack[token]) {
            token = keys(stack)
                .find((route) => route[0] === VARIABLE)
            ;

            if (!token) {
                return undefined;
            }
        }

        return down(tokens, stack[token]);
    };

    /**
     *
     * @param path
     * @param func
     */
    const set = (path: string, func: any) => {
        const tokens = tokenize(path);

        up(tokens, func, stack);
    };

    /**
     *
     * @param path
     */
    const get = (path) => {
        const token = tokenize(path);

        return down(token, stack);
    };

    /**
     *
     * @param path
     */
    const resolve = (path: string) => {
        const tokens = tokenize(path);
        const context = {};
        let level = 0;
        let cursor = stack;

        while (cursor && level < tokens.length) {
            const current = tokens[level];
            const route = keys(cursor)
                .find((item) => item === current || item[0] === VARIABLE)
            ;

            if (route && route[0] === VARIABLE) {
                const key = route.slice(1)
                    .toLowerCase()
                ;

                context[key] = tokens[level];
            }

            cursor = cursor[route];
            level++;
        }

        return context;
    };

    return {
        set,
        resolve,
        get,
        stack,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 20.12.2020
 * Time: 23:15
 */
export default factory;
