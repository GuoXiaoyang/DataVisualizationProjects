import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

let Bars = (props) => {
  console.log('props',props)
  return (
    <g className="bars">
      <rect width={5} height={10}/>  
    </g>
  );
};

Bars.propTypes = {
  xData: PropTypes.array.isRequired,
  yData: PropTypes.array.isRequired,
};

Bars = pure(Bars);
export default Bars;
