import {Command} from './types/services';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 23.07.2021
 * Time: 22:55
 */
export default [
    {
        command: 'in',
        help: '#command.in.help',
        flags: [
            ['p', 'path', 'project directory'],
        ],
    },
    {
        command: 'out',
        help: '#command.out.help',
        flags: [
            ['p', 'path', 'project directory'],
        ],
    },
] as Command[];
