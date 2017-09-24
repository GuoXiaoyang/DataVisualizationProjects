import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import d3 from 'd3';

export const Tooltip = (pos) => {
  console.log('pos:',pos);
  return (
    <div className="tooltip">
        tooltip!
    </div>  
  );
}; 

let TransitionTooltip = ({ pos }) => {

  console.log('pos:', pos);
  const tooltip = Tooltip(pos);
  return (
    <CSSTransition classNames="tool-tip" timeout={{ enter: 300, exit: 500 }}>
      {tooltip}
    </CSSTransition> 
  );
};

TransitionTooltip.propTypes = {
  pos: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }).isRequired
};
// TransitionTooltip = pure(TransitionTooltip);
export default TransitionTooltip;
