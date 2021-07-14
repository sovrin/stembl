const PATTERN_REGEX = /(\w+)/g;

/**
 *
 * @param target
 * @param pad
 * @param length
 * @return {string}
 */
const pad = (target, pad = '0', length = 2) => (
    (pad + target).slice(-length)
);

/**
 *
 * @param date
 */
const factory = (date: any = undefined) => {
    if (!date) {
        date = new Date();
    } else if (!(date instanceof Date)) {
        date = new Date(date);
    }

    const context = {
        DD: pad(date.getDate()),
        MM: pad(date.getMonth() + 1),
        YY: pad(date.getFullYear()),
        YYYY: pad(date.getFullYear(), '', 4),
        HH: pad(date.getHours()),
        hh: pad(date.getHours() % 12 || 12),
        mm: pad(date.getMinutes()),
        ss: pad(date.getSeconds()),
        A: pad(date.getHours() <= 12 ? 'AM' : 'PM', ''),
    };

    /**
     *
     * @param input
     * @return {string}
     */
    const compile = (input: string) => {
        let output = input;

        for (const part of input.match(PATTERN_REGEX)) {
            const {[part]: value} = context as any;

            if (value === undefined) {
                continue;
            }

            output = output.replace(part, value);
        }

        return output;
    };

    return {
        compile,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 22:53
 */
export default factory;
