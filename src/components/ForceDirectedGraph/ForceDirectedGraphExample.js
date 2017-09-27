import React from 'react';
import CountriesData from './data/countries.json';
import ForceDirectedGraph from './ForceDirectedGraph';

const ForceDirectedGraphExample = () => {
  const props = {
    data: CountriesData,
    size: [1000, 800],
    margin: {left:20,right:20,top:20,bottom:20}
  };
  return (
    <div className="force-directed-example">
      <ForceDirectedGraph {...props}/>
    </div>
  );
};

export default ForceDirectedGraphExample;

