import {Database} from 'vano/types/types';

const SCHEMA = {
    name: '',
};

/**
 *
 * @param database
 */
export default async (database: Database) => {
    const collection = database.collection('setting', SCHEMA);
    await collection.read();

    /**
     *
     */
    const fetch = () => {

    };

    return {
        fetch,
    };
}
