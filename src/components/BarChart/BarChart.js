import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps} from 'recompose';
import * as d3 from 'd3';

class BarChart extends React.Component {
  constructor(props){
    super(props);

    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.formatCurrency = d3.format('$.2f');
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    console.log('did mount!');
    d3.select(this.barChart).selectAll('*').remove();
    this.createBarChart();
  }
  
  componentDidUpdate() {
    console.log('did update!');
    d3.select(this.barChart).selectAll('*').remove();
    this.createBarChart();
  }
  isValidData(data) {
    return (Object.prototype.toString.call(data) === '[object Array]' && data.length > 0 && data[0].length > 0);
  }
  createBarChart() {
    const { data, width, height, margin, xAxis, yAxis } = this.props;
    let barWidth = this.props.barWidth;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    if(barWidth * data.length >= width) {
      barWidth = width/(data.length);
    }
    const minX = data[0][0], maxX = data[data.length-1][0];
    // construct ranges and axis
    const xRange = d3.scaleTime()
      .domain([new Date(minX), new Date(maxX)])
      .range([0, chartWidth]);
    const xAx = d3.axisBottom(xRange).ticks(d3.timeYear.every(xAxis.step));

    const yRange = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .range([chartHeight, 0]);
    const num = yAxis.number;
    const yAx = d3.axisLeft(yRange).ticks(num);
    
    const chart = d3.select(this.barChart)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAx);

    chart.append('g')
      .attr('class', 'y axis')
      .call(yAx)
      .append('text')
      .attr('transform', `rotate(-90)`)
      .attr('y', 6)
      .attr('dy', '0.8em')
      .style('text-anchor', 'end')
      .text(yAxis.title || '');

      // add title
      chart.append('text')
        .attr('id', 'bar-chart-title')
        .attr('x', (chartWidth/2))
        .attr('y', 20-(margin.top / 2))
        .attr('text-anchor', 'middle')
        .text('Gross Domestic Product');

    // draw bars and bind mouse event
    // ${d3.format('$.2f')(dollars)}
    const tooltip = d3.select(this.barChart)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
    const component = this;
    chart.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xRange(new Date(d[0])))
      .attr('y', d => yRange(d[1]))
      .attr('height', d => chartHeight - yRange(d[1]))
      .attr('width', barWidth)
      .on('mouseover', function(d) {
        const rect = d3.select(this);
        rect.attr('class', 'mouseover');
        const currentDateTime = new Date(d[0]);
        const year = currentDateTime.getFullYear();
        const month = currentDateTime.getMonth();
        const dollars = d[1];
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip.html(`<span class='amount'>${component.formatCurrency(dollars)} Billion </span><br><span class='year'>${year}-${component.months[month]}</span>`)
          .style('left', (d3.event.pageX + 5) + 'px')
          .style('top', (d3.event.pageY - 50) + 'px');
      })
      .on('mouseout', function() {
        const rect = d3.select(this);
        rect.attr('class', 'mouseoff');
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

  }
  
  render() {
    // const { data } = this.props;
    // if(!this.isValidData(data)) return null;

    return (
      <div className="bar-chart" ref={node => this.barChart = node}>

      </div>
    );
  }
}


BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
  }).isRequired,
  barWidth: PropTypes.number.isRequired,
  xAxis: PropTypes.shape({
    title: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  })
};

const defaultBarProps = {
  width: 1000,
  height: 500,
  margin: {
    top: 10,
    right: 20,
    bottom: 30,
    left: 50,
  },
  barWidth: 20,
  xAxis: {
    title: '',
    step: 1,
  },
  yAxis: {
    title: '',
    number: 10,
  }
};


const enhance = compose(defaultProps(defaultBarProps));
BarChart = enhance(BarChart);

export default BarChart;