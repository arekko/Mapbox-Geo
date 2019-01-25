/* global window */
import React from "react";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";

import Pin from "./Pin";
import MessageWindow from "./MessageWindow";
import Dialog from "./Dialog";

import db from "../../config/fbConfig";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class Map extends React.PureComponent {
  state = {
    viewport: {
      latitude: 60.1699,
      longitude: 24.9384,
      zoom: 12,
      bearing: 0,
      pitch: 0
    },
    pList: [],
    popupInfo: null,
    dialogOpen: false,
    message: {
      latitude: 0,
      longitude: 0
    }
  };

  componentDidMount = async () => {
    const placesList = [];
    await db.ref("places").on("value", snapshot => {
      snapshot.forEach(item => {
        placesList.push(item.val());
      });
      this.setState({
        pList: placesList
      });
    });
  };

  submitMessage = async message => {
    const newMessage = {
      ...this.state.message,
      message
    };

    await db.ref("places").push({
      ...newMessage
    });

    this.setState({ dialogOpen: false });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  createMarker(e) {
    this.setState({
      message: {
        latitude: e.lngLat[1],
        longitude: e.lngLat[0]
      }
    });
    this.setState({ dialogOpen: true });
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  renderMarkers = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
      >
        <Pin size={20} onClick={() => this.setState({ popupInfo: city })} />
      </Marker>
    );
  };

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <MessageWindow info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport, dialogOpen, pList } = this.state;
    return (
      <React.Fragment>
        <MapGL
          {...viewport}
          width="100wh"
          height="100vh"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onClick={e => this.createMarker(e)}
        >
          {pList.map(this.renderMarkers)}

          <Dialog
            dialogOpen={dialogOpen}
            handleClose={this.handleClose}
            submitMessage={this.submitMessage}
          />

          {this.renderPopup()}

          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>
        </MapGL>
      </React.Fragment>
    );
  }
}
