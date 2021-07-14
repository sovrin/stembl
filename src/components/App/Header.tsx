import React from 'react';
import {Text} from 'ink';
import useSettings from 'hooks/useSettings';

/**
 *
 * @constructor
 */
const Header = () => {
    const {name, version} = useSettings();

    return (
        <Text color="green">
            {name} - {version}
        </Text>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 21:08
 */
export default Header;
