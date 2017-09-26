import React from 'react';
import TempData from './data/global-temperature.json';
import HeatMap from './HeatMap';

const HeatMapExample = () => {
  const props = {
    data: CyclistData,
    size: [1000, 600],
    margin: {left:50,right:150,top:50,bottom:50}
  };
  return (
    <div className="heatmap-example">
      <Scatter {...props}/>
    </div>
  );
};

export default HeatMapExample;

