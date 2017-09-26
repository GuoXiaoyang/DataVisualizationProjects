import React from 'react';
import CyclistData from './data/cyclist-data.json';
import Scatter from './Scatter';

const ScatterExample = () => {
  const props = {
    data: CyclistData,
    size: [1000, 600],
    margin: {left:50,right:150,top:50,bottom:50}
  };
  return (
    <div className="scatter-example">
      <Scatter {...props}/>
    </div>
  );
};

export default ScatterExample;

