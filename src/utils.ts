/**
 *
 * @param key
 */
export const pick = (key: string) => (array) => array[key];


/**
 *
 * @param args
 */
export const pipe = (...args) => args.reduce((prev, curr) => curr(prev));
