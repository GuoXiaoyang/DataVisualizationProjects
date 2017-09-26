import React from 'react';
import TempData from './data/global-temperature.json';
import HeatMap from './HeatMap';

const HeatMapExample = () => {
  const props = {
    data: TempData,
    size: [1000, 700],
    margin: {left:100,right:50,top:160,bottom:100}
  };
  return (
    <div className="heatmap-example">
      <HeatMap {...props}/>
    </div>
  );
};

export default HeatMapExample;

