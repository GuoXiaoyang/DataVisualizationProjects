import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';


let YAxis = (props) => {
  console.log('props', props);
  return (
    <g className="y-axis">
      <text>
        YAxis
      </text>  
    </g>
  );
};

YAxis.propTypes = {
  data: PropTypes.array.isRequired
};

YAxis = pure(YAxis);
export default YAxis;
