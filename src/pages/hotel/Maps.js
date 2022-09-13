/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";

const Markers = props => {
  return (
    <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
       <Marker
            key={props.places.id}
            position={{ lat: props.places.lat, lng: props.places.lng }}
            draggable={true}
          />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Markers));
