/* global window */
import React from "react";
import Map from "./map/Map";
import Header from "./ui/Header";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Map />
      </React.Fragment>
    );
  }
}
