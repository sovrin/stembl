import React, {Fragment} from 'react';
import {Box} from 'ink';
import {Framework, Router, Settings, I18n} from 'contexts';
import Header from './Header';
import Spacer from './Spacer';
import Status from './Status';
import Database from '../../contexts/Database';

/**
 *
 * @param name
 * @param version
 * @param routes
 * @constructor
 */
const App = ({name, version, routes}) => (
    <Box flexDirection="column">
        <Settings
            name={name}
            version={version}
        >
            {({language}) => (
                <I18n lang={language}>
                    <Database>
                        <Framework>
                            {({route, data}) => (
                                <Fragment>
                                    <Header/>
                                    <Spacer/>
                                    <Status/>
                                    <Spacer/>
                                    <Router
                                        route={route}
                                        data={data}
                                        routes={routes}
                                    />
                                </Fragment>
                            )}
                        </Framework>
                    </Database>
                </I18n>
            )}
        </Settings>
    </Box>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.07.2021
 * Time: 22:04
 */
export default App;
