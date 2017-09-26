import React from 'react';
import CyclistData from './data/cyclist-data.json';
import ForceDirectedGraph from './ForceDirectedGraph';

const ForceDirectedGraphExample = () => {
  const props = {
    data: CyclistData,
    size: [1000, 600],
    margin: {left:50,right:150,top:50,bottom:50}
  };
  return (
    <div className="scatter-example">
      <ForceDirectedGraph {...props}/>
    </div>
  );
};

export default ForceDirectedGraphExample;

