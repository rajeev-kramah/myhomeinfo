import React, { Component } from "react";
import "./App.css";
import HouseDetails from "./components/House-details";
class App extends Component {
  render() {
    return (
      <div className="container">
        <HouseDetails />
      </div>
    );
  }
}

export default App;
