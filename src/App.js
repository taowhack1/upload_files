import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import SignIn from "./components/authen/SignIn";
import ViewFiles from "./components/files/ViewFiles";
import ViewFolderAdmin from "./components/files/ViewFolderAdmin";
import AddFolder from "./components/files/AddFolder";
import Registor from "./components/authen/Registor";
import ViewFilesAdmin from "./components/files/ViewFilesAdmin";
import ManageUserFirst from "./components/files/ManageUserFirst";
import ManageUserSecond from "./components/files/ManageUserSecond";
import Dowload from "./components/files/Dowload";
import ConfirmDowload from "./components/files/ConfirmDowload";
import NotFound from "./components/pages/Notfound";
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles"; //Google fonts
import { SnackbarProvider } from "notistack";

const token = localStorage.getItem("authData");
const tokenParse = JSON.parse(token);

if (tokenParse) {
  store.dispatch({
    type: "AUTH_USER",
    payload: tokenParse,
  });
}

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Sarabun"'].join(","),
  },
  overrides: {
    MuiTableCell: {
      root: {
        paddingTop: 6,
        paddingBottom: 6,
        ['@media (max-width:600px)']: {
          paddingTop: 8,
          paddingBottom: 8,
        }
      },
    }
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Navbar />
            <Switch>
              <Route
                exact
                path="/viewfolderadmin"
                children={<ViewFolderAdmin />}
              />
              <Route
                exact
                path="/manageuserfirst"
                component={ManageUserFirst}
              />
              <Route
                exact
                path="/manageusersecond/:user_id"
                component={ManageUserSecond}
              />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/" component={Home} />
              <Route exact path="/ViewFiles/:folder_id" component={ViewFiles} />
              <Route
                exact
                path="/viewfilesadmin/:folder_id"
                component={ViewFilesAdmin}
              />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
