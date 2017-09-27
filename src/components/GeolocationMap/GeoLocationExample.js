import React from 'react';
import MapData from './data/meteorite-strike-data.json';
import GeoLocationMap from './GeoLocationMap';

const GeolocationMapExample = () => {
  const props = {
    data: CyclistData,
    size: [1000, 600],
    margin: {left:50,right:150,top:50,bottom:50}
  };
  return (
    <div className="geolocation-map-example">
      <GeolocationMap {...props}/>
    </div>
  );
};

export default GeolocationMapExample;

