import sideBar from "./components/sideBar";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import "./style.css";
import dropZone from "./dropZone";
class App extends Component {
  render() {
    return (
      <div>
        <dropZoneArea />
      </div>
    );
  }
}
export default App;
