import {useContext} from 'react';
import {Context} from 'contexts/Database';
import {Week, Setting} from 'types/collections';
import {SchemaType as WeekSchema} from 'collections/week';

const Database = {
    WEEK: 'week',
    SETTING: 'setting',
} as const;

type Databases = {
    [Database.WEEK]: Week<WeekSchema>,
    [Database.SETTING]: Setting,
};

/**
 *
 * @param name
 */
const useDatabase = <T extends keyof Databases>(name: T): Promise<Databases[T]> => {
    const {bootstrap} = useContext(Context);

    return bootstrap(name);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 23:01
 */
export default useDatabase;
