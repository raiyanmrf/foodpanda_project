import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
  Pin,
} from "@vis.gl/react-google-maps";
import React from "react";

const GoogleMap = ({ lat, lng }) => {
  const position = { lat: lat, lng: lng };
  const apiKey = import.meta.env.VITE_REACT_GOOGLE_MAP_API;
  const mapId = import.meta.env.VITE_REACT_GOOGLE_MAP_ID;

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: "50vh", width: "100%" }}>
        <Map zoom={20} center={position} mapId={mapId}>
          <AdvancedMarker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
