import React from 'react';
import '../styles/App.css';
import BarChart from './BarChart';

const App = () => {
  const barProps = {
    data: [[1,5], [2,10], [3,1], [4,3]],
    width: 1000,
    height: 500,
    tooltip: false,
    barWidth: 30,
    xAxis: {
      type: 'date',
      title: 'Year',
      start: '1945-01-00',
      step:  '5-00-00'
    },
    yAxis: {
     type: 'number',
     title: 'Gross Domestic Product, USA',
     start: 0,
     step: 2000 
   }
  };
  return (
    <div className='App'>
    <h2>Gross Domestic Product</h2>
    <BarChart {...barProps} />
  </div>
  );
};

export default App;