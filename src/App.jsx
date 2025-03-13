import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OwnerForm from './components/OwnerForm';
import OwnerSearch from './components/OwnerSearch';
import OwnerDetails from './components/OwnerDetails';
import OwnersList from './components/OwnersList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/owners/new" component={OwnerForm} />
        <Route exact path="/owners" component={OwnerSearch} />
        <Route exact path="/owners/list" component={OwnersList} />
        <Route exact path="/owners/:id" component={OwnerDetails} />
        {/* 필요에 따라 다른 라우트 추가 */}
      </Switch>
    </Router>
  );
}

export default App;