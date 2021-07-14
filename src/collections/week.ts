import {Database} from 'vano/types/types';
import {date as dateFactory} from 'services';
import {DATE_FORMAT} from 'const';

const SCHEMA = {
    day: '',
    in: '',
    out: '',
    pause: '',
};

/**
 *
 * @param database
 */
export default async (database: Database) => {
    const collection = database.collection('week', SCHEMA);
    await collection.read();

    /**
     *
     */
    const fetch = () => {
        const date = dateFactory()
            .compile(DATE_FORMAT)
        ;

        return collection.query()
            .eq('day', date)
            .get()
        ;
    };

    /**
     *
     * @param entry
     */
    const insert = (entry: typeof SCHEMA) => {
        const id = collection.add(entry);
        collection.write();

        return id;
    };

    const signIn = () => {
        const current = fetch();

        if (!current) {

        }

        // collection.add({
        //     day: date,
        //     in: '06:00:00',
        //     out: '12:00:00',
        //     pause: '20:00:00',
        // });
    }

    const signOut = () => {

    }

    return {
        fetch,
        insert,
    };
};
