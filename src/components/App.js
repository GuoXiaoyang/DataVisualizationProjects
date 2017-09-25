import React from 'react';
import '../styles/App.css';
import BarChart from './BarChart';
import GDP from '../data/GDP-data.json';

const App = () => {
  const barProps = {
    data: GDP.data,
    width: 1000,
    height: 500,
    barWidth: 30,
    xAxis: {
      type: 'date',
      title: 'Year',
      step:  5
    },
    yAxis: {
      number: 10,
      title: 'Gross Domestic Product, USA'
    },
    margin: {
      left: 75,
      right: 20,
      top: 20,
      bottom:30
    }
  };
  // console.log('data:', GDP.data);
  return (
    <div className='App'>
      <h2>Gross Domestic Product</h2>
      <BarChart {...barProps} />
  </div>
  );
};

export default App;