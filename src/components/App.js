import React from 'react';
import BarChartExample from './BarChart/BarChartExample';
import ScatterExample from './ScatterPlot/ScatterExample';
import '../styles/basic.css';
import '../styles/barChart.css';
import '../styles/scatter.css';


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const App = () => (
  <div className="App">
    <h2>
      <Link to="/">Visualization Projects</Link>
    </h2>
    <ul>
      <li><Link to="/BarChart">BarChart</Link></li>
      <li><Link to="/ScatterPlot">ScatterPlot</Link></li>
    </ul>

  </div>
);

const RouterApp =() => {

  return (
    <Router basename="/DataVisualizationProjects">
      <div>
        <Route path="/" component={App}>
        </Route>
        <Route path="/BarChart" component={BarChartExample}>
        </Route>
        <Route path="/ScatterPlot" component={ScatterExample}>
        </Route>      
      </div>     
    </Router>
  );
};


export default RouterApp;