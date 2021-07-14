import {Command} from 'types/services';

/**
 *
 * @param help
 * @param flags
 */
const command: Command = (help, flags) => {
    help('#command.in.help');

    flags([
        ['p', 'path', 'project directory'],
    ]);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 21:18
 */
export default command;
