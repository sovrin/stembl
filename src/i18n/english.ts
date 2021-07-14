/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 21:41
 */
export default {
    command: {
        in: {
            help: 'check in',
        },
        out: {
            help: 'check out',
        },
    },
    status: {
        signed: {
            in: ({time}) => `signed in at ${time}`,
            out: ({time}) => `signed out at ${time}`,
        }
    },
};
