import React from 'react';

import {ContextProvider} from './services/context';

import Routes from './routes';

var App = () => <ContextProvider><Routes /></ContextProvider>;

export default App;
