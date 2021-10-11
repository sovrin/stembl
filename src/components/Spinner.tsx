import React, {useState, useEffect} from 'react';
import {Text} from 'ink';

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/**
 *
 * @constructor
 */
const Spinner = ({isLoading}) => {
    const [frame, setFrame] = useState(0);
    const interval = 80;

    /**
     *
     */
    const onMount = () => {
        const timer = setInterval(() => (
            setFrame((frame) => (frame + 1) % FRAMES.length)
        ), interval);

        return () => {
            clearInterval(timer);
        };
    };

    useEffect(onMount, [isLoading]);

    if (!isLoading) {
        return null;
    }

    return (
        <Text color="blue">
            {FRAMES[frame]}
        </Text>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.07.2021
 * Time: 21:04
 */
export default Spinner;
