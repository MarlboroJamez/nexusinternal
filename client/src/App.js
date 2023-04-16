import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';

// Private Route
import PrivateRoute from './routes/private';

// Auth Routes
import LoginRoute from './pages/auth/login';

// Private Routes
import ProfileRoute from './pages/private/profile/profile'
import DashboardRoute from './pages/private/dashboard/dashboard';
import SearchRoute from './pages/private/search/search';
import DirectoryRoute from './pages/private/directory/directory';
import TeamRoute from './pages/private/team/team';
import SupportRoute from './pages/private/support/support';

function App({msalInstance}) {
  return (
    <Router>
        <div className="App font-sans">
          <Switch>
            <MsalProvider instance={msalInstance}>
              {/* AUTH ROUTE */}
              <Route exact path="/" component={LoginRoute}/>

              {/* PRIVATE ROUTE */}
              <PrivateRoute exact path="/user/profile" component={ProfileRoute}/>
              <PrivateRoute exact path="/support" component={SupportRoute}/>
              <PrivateRoute exact path="/dashboard" component={DashboardRoute}/>
              <PrivateRoute exact path="/search" component={SearchRoute}/>
              <PrivateRoute exact path="/directory" component={DirectoryRoute}/>
              <PrivateRoute exact path="/team" component={TeamRoute}/>
            </MsalProvider>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
