import {Database} from 'vano/types/types';
import {date as dateFactory} from 'services';
import {DATE_FORMAT} from 'const';
import {Week} from 'types/collections';

const SCHEMA = {
    day: '',
    in: '',
    out: '',
    pause: '',
};

export type SchemaType = typeof SCHEMA;

/**
 *
 * @param database
 */
export default async (database: Database): Promise<Week<SchemaType>> => {
    const collection = database.collection('week', SCHEMA);
    await collection.read();

    //
    // /**
    //  *
    //  * @param entry
    //  */
    // const insert = (entry: typeof SCHEMA) => {
    //     const id = collection.add(entry);
    //     collection.write();
    //
    //     return id;
    // };
    //

    //
    // const signIn = () => {
    //     const current = fetch();
    //
    //     if (!current) {
    //
    //     }
    //
    //     // collection.add({
    //     //     day: date,
    //     //     in: '06:00:00',
    //     //     out: '12:00:00',
    //     //     pause: '20:00:00',
    //     // });
    // }

    // const signOut = () => {
    //
    // }

    /**
     *
     */
    const current = (): SchemaType => {
        const date = dateFactory()
            .compile(DATE_FORMAT)
        ;

        const [head] = collection.query()
            .eq('day', date)
            .get()
        ;

        return head;
    }

    return {
        current,
    };
};
