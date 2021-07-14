import React, {useState, useEffect} from 'react';
import {Text} from 'ink';

/**
 *
 * @constructor
 */
const Spinner = () => {
    const [frame, setFrame] = useState(0);
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const interval = 80;

    useEffect(() => {
        const timer = setInterval(() => (
            setFrame((frame) => (frame + 1) % frames.length)
        ), interval);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Text color="blue">
            {frames[frame]}
        </Text>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.07.2021
 * Time: 21:04
 */
export default Spinner;
