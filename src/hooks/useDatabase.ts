import {useContext} from 'react';
import {Context} from '../contexts/Database';

/**
 *
 */
const useDatabase = () => {
    return useContext(Context);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 23:01
 */
export default useDatabase;
