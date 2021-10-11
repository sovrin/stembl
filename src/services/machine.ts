import {Machine} from '../types/services/Machine';

/**
 *
 * @param head
 * @param graph
 */
const factory: Machine = (head, graph = {}) => {
    let current = head || Object.keys(graph)[0];

    if (graph[head]) {
        graph[head].action();
        current = head;
    }

    /**
     *
     * @param to
     * @param params
     */
    const transition = (to, ...params) => {
        if (!graph[current] || !graph[graph[current].to[to]]) {
            return;
        }

        graph[graph[current].to[to]].action(...params);

        current = graph[current].to[to];
    };

    return {
        transition,
    };
};

// const m = factory('IDLE', {
//     IDLE: {
//         action: () => {
//         },
//         to: {
//             click: 'CLICKED',
//         },
//     },
//     CLICKED: {
//         action: () => {
//         },
//         to: {
//             click: 'IDLE',
//         },
//     },
// });
//
// m.transition('click', 'yeet');
// m.transition('', 'yeet');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.09.2021
 * Time: 20:05
 */
export default factory;
