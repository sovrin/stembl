import React from 'react';
import {Box, Text} from 'ink';
import {useI18n} from 'hooks';
import {Props} from 'types/contexts';

/**
 *
 * @param data
 * @constructor
 */
const Help = ({data}: Props) => {
    const {commands} = data;
    const {generate} = useI18n({
        generate: (key) => key.slice(1),
    });

    const [maxMargin] = commands.map(({command}) => command)
        .map((command) => command.length)
        .sort()
        .reverse()
    ;

    /**
     *
     * @param command
     * @param text
     */
    const build = ({command, help}) => {
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
                    {generate(help)}
                </Text>
            </Box>
        );
    };

    const children = commands.map(build);

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
