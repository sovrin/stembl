import {useContext} from 'react';
import {Context} from 'contexts/Settings';
import {Action} from 'reducers/settings';
import {Settings} from 'types/contexts/Settings';

/**
 *
 */
const useSettings = () => {
    const {dispatch, state} = useContext(Context) as Settings;

    return {
        Action,
        dispatch,
        ...state,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 21:48
 */
export default useSettings;
