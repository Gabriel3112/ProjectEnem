import React from 'react';

import {AuthContext} from './services/auth';

import Routes from './routes';

var App = () => <AuthContext><Routes /></AuthContext>;

export default App;
