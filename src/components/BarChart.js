import React from 'react';
import { compose, defaultProps, withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';
import Bars from './Bars';
import XAxis from './XAxis';
import YAxis from './YAxis';
import TransitionTooltip from './TransitionTooltip';



let BarChart = (props) => {
  console.log('props:',props);
  const validData = (data) => (Object.prototype.toString.call(data) === '[object Array]' && data.length > 0 && data[0].length > 0);
  const { data, width, height, padding, tooltip, tooltipShow, barWidth, barColor, xAxis, yAxis, pos } = props;
  // valid data
  if(!validData(data)) {
    return null;
  }
  const showTooltip = (pos) => {
    if(!tooltip) return;
    props.setPos(pos);
    props.show();
  };
  const xData = data.map(d => d[0]);
  const yData = data.map(d => d[1]);
  const xType = xAxis.type || 'number';
  const yType = yAxis.type || 'number';
  const barStart = {
    x: padding.left,
    y: padding.top
  };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.top;
  return (
  <div className="bar-chart">
    <svg className="bar-chart-svg" width={width} height={height}>
      <g className="class">
        <XAxis data={xData} type={xType} width={chartWidth} axisProps={xAxis}/>
        <YAxis data={yData} type={yType} height={chartHeight} axisProps={yAxis}/>
        <Bars xData={xData} yData={yData} startX={barStart.x} startY={barStart.y} width={chartWidth} height={chartHeight} barWidth={barWidth} color={barColor} showTooltip={(pos) => showTooltip(pos)}/>
      </g>
    </svg>
    {/* whether to render tooltip */}
    <TransitionTooltip pos={pos}/>
    
  </div>
  );
};
BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  padding: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
  }).isRequired,
  tooltip: PropTypes.bool.isRequired,
  barWidth: PropTypes.number.isRequired,
  barColor: PropTypes.string.isRequired,
  xAxis: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    start:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    step:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  yAxis: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    start:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    step: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  }),
  tooltipShow: PropTypes.bool,
  pos: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }),
  setPos: PropTypes.func,
  setShow: PropTypes.func
};

const defaultBarProps = {
  width: 1000,
  height: 500,
  padding: {
    top: 10,
    right: 20,
    bottom: 30,
    left: 50,
  },
  tooltip: true,
  barWidth: 20,
  barColor: '#4581b4',
  xAxis: {
    type: 'number',
  },
  yAxis: {
    type: 'number',
  },
};

const stateHandlers = withStateHandlers(
  ({ initialPos = {left: 0, top: 0},  tooltipShow = false }) => ({
    pos: initialPos,
    tooltipShow: tooltipShow,
  }),
  {
    setPos: ({ pos }) => (offset) => ({pos: {left: pos.left + offset.left, top: pos.top + offset.top}}),
    setShow: () => () => ({tooltipShow: true}),
  }
);
const enhance = compose(stateHandlers, defaultProps(defaultBarProps));
BarChart = enhance(BarChart);

export default BarChart;