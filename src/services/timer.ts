import {performance} from 'perf_hooks';

/**
 *
 * @param ms
 * @param signal
 * @param callback
 */
const factory = (ms: number, signal: AbortSignal, callback: Function) => {
    const start = performance.now();
    let timeout;

    /**
     *
     * @param time
     */
    function frame(time) {
        if (signal.aborted) {
            return;
        }

        callback(time);
        schedule(time);
    }

    /**
     *
     * @param time
     */
    function schedule(time) {
        const elapsed = time - start;
        const rounded = Math.round(elapsed / ms) * ms;
        const next = start + rounded + ms;
        const delay = next - performance.now();

        timeout = setTimeout(() => {
            frame(next);
        }, delay);
    }

    schedule(start);

    return () => {
        clearTimeout(timeout);
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 14.07.2021
 * Time: 22:10
 */
export default factory;
