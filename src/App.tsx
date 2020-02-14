import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Index = loadable(() => import('./pages/Index/Index'), {
    fallback: <div>Loading...</div>
});

const Details = loadable(() => import('./pages/Details/Details'), {
    fallback: <div>Loading...</div>
});

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/topic/:id" component={Details} />
        </Switch>
    </Router>
);

export default App;
