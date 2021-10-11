import React, {useEffect, useRef, useState} from 'react';
import {Text} from 'ink';
import {useDatabase, useI18n} from 'hooks';
import {timer} from 'services';
import Spinner from '../Spinner';

/**
 *
 * @constructor
 */
const Status = () => {
    const state = useRef({
        isLoading: true,
    });
    // const [tick, setTick] = useState(null);

    const {generate} = useI18n({
        generate: (status, ...parameters) => [['status', 'signed', status].join('.'), parameters],
    });

    console.info('render');

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
            {/*status: {tick}*/}
            <Spinner isLoading={state.current.isLoading}/>
        </Text>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 21:27
 */
export default Status;
