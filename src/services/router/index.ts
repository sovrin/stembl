import storeFactory from './store';

/**
 *
 */
const factory = () => {
    const store = storeFactory();

    /**
     *
     * @param routes
     */
    const register = (routes): void => {
        for (const [path, value] of Object.entries(routes)) {
            store.set(path, value);
        }
    };

    /**
     *
     * @param route
     */
    const fetch = (route: string) => {
        let target = store.get(route);

        while (typeof target === 'string') {
            target = store.get(target);
        }

        const query = route
            && target
            && store.resolve(route)
            || {}
        ;

        return [
            target,
            query,
        ];
    };

    return {
        register,
        fetch,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.06.2021
 * Time: 22:21
 */
export default factory;
