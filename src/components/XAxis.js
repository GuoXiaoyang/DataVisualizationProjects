import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';


let XAxis = (props) => {
  console.log('props', props);
  return (
    <g className="x-axis">
      <text>
         XAxis
      </text>  
    </g>
  );
};

XAxis.propTypes = {
  data: PropTypes.array.isRequired
};
XAxis = pure(XAxis);
export default XAxis;
