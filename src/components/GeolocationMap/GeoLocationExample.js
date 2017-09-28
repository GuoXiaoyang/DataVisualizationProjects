import React from 'react';
import MapData from './data/meteorite-strike-data.json';
import GeolocationMap from './GeoLocation';

const GeolocationExample = () => {
  const props = {
    data: MapData,
    size: [1000, 980],
    margin: {left:0, right:0, top:0, bottom:0}
  };
  return (
    <div className="geolocation-map-example">
      <GeolocationMap {...props}/>
    </div> 
  );
};

export default GeolocationExample;

