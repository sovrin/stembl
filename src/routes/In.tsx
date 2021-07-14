import React from 'react';
import {Text} from 'ink';
import {useDatabase} from 'hooks';

/**
 *
 * @constructor
 */
const In = () => {
    const {bootstrap} = useDatabase();

    bootstrap('week').then((week) => {
        console.info(week);
    });

    return (
        <Text>
            in
        </Text>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 22:30
 */
export default In;
