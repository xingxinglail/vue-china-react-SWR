import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import Details from './pages/Details/Details';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/topic/:id" component={Details} />
        </Switch>
    </Router>
);

export default App;
