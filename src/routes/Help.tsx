import React from 'react';
import {Box, Text} from 'ink';
import {useI18n} from '../hooks';

/**
 *
 * @param data
 * @constructor
 */
const Help = ({data}) => {

    const {getHelpText} = useI18n({
        getHelpText: (key) => {
            return key.slice(1);
        },
    });

    const [maxMargin] = data.map(([command]) => command)
        .map((command) => command.length)
        .sort()
        .reverse()
    ;

    /**
     *
     * @param command
     * @param text
     */
    const build = ([command, helpKey]) => {
        const margin = maxMargin - command.length + 3;

        return (
            <Box
                flexDirection="row"
                key={command}
            >
                <Box marginRight={margin}>
                    <Text color="blue">
                        {command}
                    </Text>
                </Box>
                <Text>
                    {getHelpText(helpKey)}
                </Text>
            </Box>
        );
    };

    const children = data.map(build);

    return (
        <Box flexDirection="column">
            {children}
        </Box>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.07.2021
 * Time: 18:19
 */
export default Help;
