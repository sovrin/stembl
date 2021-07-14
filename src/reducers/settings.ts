export const Action = {
    SET_LANGUAGE: 'set_language',
} as const;

/**
 *
 * @param state
 * @param action
 * @param value
 */
const factory = (state, {action, value}) => {
    /**
     *
     * @param key
     */
    const set = (key) => (value: any) => {
        state[key] = value;

        return {
            ...state,
        };
    };

    const {[action]: fn} = {
        [Action.SET_LANGUAGE]: set('language'),
    } as any;

    if (!fn) {
        return state;
    }

    return fn(value);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 21:45
 */
export default factory;
