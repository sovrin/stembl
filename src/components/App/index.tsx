import React, {Fragment, useEffect} from 'react';
import {Box} from 'ink';
import {Backend, Router, Settings, I18n, Database} from 'contexts';
import Header from './Header';
import Spacer from './Spacer';
import Status from './Status';
import {useDatabase} from '../../hooks';

/**
 *
 * @param name
 * @param version
 * @param routes
 * @constructor
 */
const App = ({name, version, routes}) => {
    useEffect(() => {
        useDatabase('week')
            .then((week) => week.current())
            .then((value => {
                // state.current.isLoading = false;
                console.info(value);
            }))
            .catch(console.error);
    }, []);


    return (
        <Box flexDirection="column">


            <Settings
                name={name}
                version={version}
            >
                {({language}) => (
                    <I18n lang={language}>
                        <Database>
                            <Backend>
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
                            </Backend>
                        </Database>
                    </I18n>
                )}
            </Settings>
        </Box>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.07.2021
 * Time: 22:04
 */
export default App;
