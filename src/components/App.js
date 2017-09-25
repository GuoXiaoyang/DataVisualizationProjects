import React from 'react';
import BarChartExample from './BarChart/BarChartExample';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const App = () => (
  <div className="App">
    <h2><Link to="/">Visualization Projects</Link></h2>
    <ul>
      <li><Link to="/BarChart">BarChart</Link></li>
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
      </div>     
    </Router>
  );
};


export default RouterApp;