import {createElement} from 'react';
import {render} from 'ink';
import {App} from './components';
import routes from './routes';

const {version, name} = require('../package.json');

const element = createElement(App, {
    name,
    version,
    routes,
});

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.07.2021
 * Time: 17:39
 */
render(element);
