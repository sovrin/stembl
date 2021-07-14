import assert from 'assert';
import routerFactory from '../../src/services/router';

const ROOT = Symbol();
const WILDCARD = Symbol();

/**
 *
 * @param object
 */
const isEmpty = (object: object): boolean => (
    Object.keys(object).length === 0
);

describe('router', () => {
    const router = routerFactory();
    const routes = {
        'root': ROOT,
        'root/:param': ROOT,
        'redirect': 'root',
        'wildcard/*': WILDCARD,
    };

    router.register(routes);

    it('should return null', () => {
        {
            const [value, query] = router.fetch(null);

            assert(value === undefined);
            assert(isEmpty(query));
        }

        {
            const [value, query] = router.fetch('unknown');

            assert(value === undefined);
            assert(isEmpty(query));
        }
    });

    it('should return root', () => {
        {
            const [value, query] = router.fetch('root');

            assert(value === ROOT);
            assert(isEmpty(query));
        }
    });

    it('should return root with param', () => {
        const [value, query] = router.fetch('root/foobar');

        assert(value === ROOT);
        assert(query.param === 'foobar');
    });

    it('should redirect to root', () => {
        {
            const [value, query] = router.fetch('redirect');

            assert(value === ROOT);
            assert(isEmpty(query));
        }
    });

    it('should handle wildcard', () => {
        {
            const [value, query] = router.fetch('wildcard');

            assert(value === undefined);
            assert(isEmpty(query));
        }

        {
            const [value, query] = router.fetch('wildcard/foobar');

            assert(value === WILDCARD);
            assert(isEmpty(query));
        }
    });
});
