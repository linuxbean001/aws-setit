import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'

import FrontendRouter from './component/frontendrouter';
import BackendRouter from './component/backendrouter';
function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={FrontendRouter} />
            <Route path="/home" component={FrontendRouter} />
            <Route path="/front" component={FrontendRouter} />
            <Route path="/admin" component={BackendRouter} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
