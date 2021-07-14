import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import {useI18n} from 'hooks';
import {timer} from 'services';

/**
 *
 * @constructor
 */
const Status = () => {
    const [tick, setTick] = useState(null);

    const {status} = useI18n({
        status: (status, ...parameters) => [['status', 'signed', status].join('.'), parameters],
    });

    // useEffect(() => {
    //     const controller = new AbortController();
    //
    //     timer(1000, controller.signal, (time) => {
    //         setTick(time);
    //         console.info('status', time);
    //     });
    // }, []);

    return (
        <Text color="green">
            status: {tick}
        </Text>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 21:27
 */
export default Status;
