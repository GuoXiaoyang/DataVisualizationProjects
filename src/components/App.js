import React from 'react';
import BarChartExample from './BarChart/BarChartExample';
import ScatterExample from './ScatterPlot/ScatterExample';
import HeartMapExample from './HeatMap/HeatMapExample';
import ForceDirectedGraphExample from './ForceDirectedGraph/ForceDirectedGraphExample';
import GeoLocationMapExample from './ForceDirectedGraph/GeoLocationMapExample';
import '../styles/basic.css';
import '../styles/barChart.css';
import '../styles/scatter.css';
import '../styles/heatMap.css';
import '../styles/foceDirectedGraph.css';
import '../styles/geolocationMap.css';

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
      <li><Link to="/HeatMap">HeatMap</Link></li>
      <li><Link to="/ForceDirectedGraph">ForceDirectedGraph</Link></li>
      <li><Link to="/GeolocationMap">GeolocationMap</Link></li>
      GeolocationMap
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
        <Route path="/HeatMap" component={HeartMapExample}>
        </Route>         
        <Route path="/ForceDirectedGraph" component={ForceDirectedGraphExample}>
        </Route> 
        <Route path="/GeolocationMap" component={GeoLocationMapExample}>
        </Route> 
        
      </div>     
    </Router>
  );
};


export default RouterApp;