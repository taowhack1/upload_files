import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import SignIn from './components/authen/SignIn';
import ViewFiles from './components/files/ViewFiles';
import ViewFolderAdmin from './components/files/ViewFolderAdmin';
import AddFolder from './components/files/AddFolder';
import AddUser from './components/files/AddUser';
import Delete from './components/files/DeleteFiles';
import ViewFilesAdmin from './components/files/ViewFilesAdmin';
import ManageUser from './components/files/MangeUser';
import ManageUserFirst from './components/files/ManageUserFirst';
import ManageUserSecond from './components/files/ManageUserSecond';
import Dowload from './components/files/Dowload';
import ConfirmDowload from './components/files/ConfirmDowload';
import test from './components/files/test';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; //Google fonts

const token = localStorage.getItem('authData');
const tokenParse = JSON.parse(token);
if (tokenParse) {
  store.dispatch({
    type: 'AUTH_USER',
    payload: tokenParse,
  });
}

//Google Fonts
const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Sarabun"'].join(','),
  },
});
//

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/admin' component={AddFolder} />
            <Route exact path='/adduser' component={AddUser} />
            <Route exact path='/del' component={Delete} />
            <Route exact path='/viewfolderadmin' component={ViewFolderAdmin} />
            <Route exact path='/manageuser' component={ManageUser} />
            <Route exact path='/manageuserfirst' component={ManageUserFirst} />
            <Route
              exact
              path='/manageusersecond'
              component={ManageUserSecond}
            />
            <Route exact path='/dowload' component={Dowload} />
            <Route exact path='/confirm' component={ConfirmDowload} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/test' component={test} />
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/ViewFiles/:folder_id:folder_name'
              children={<ViewFiles />}
            />
            <Route
              exact
              path='/viewfilesadmin/:folder_id:folder_name'
              children={<ViewFilesAdmin />}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
