import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import SignIn from './components/authen/SignIn';
import ViewFiles from './components/files/ViewFiles';

const token = localStorage.getItem('user_id');
if (token) {
  store.dispatch({
    type: 'AUTH_USER',
    payload: token,
  });
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/' component={Home} />
          <Route exact path='/ViewFiles/:folder_id' children={<ViewFiles />} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
