import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.createHeatMap = this.createHeatMap.bind(this);
  }

  componentDidMount() {
    d3.select(this.heatMap).selectAll('*').remove();
    this.createHeatMap();
  }
  
  componentDidUpdate() {
    d3.select(this.heatMap).selectAll('*').remove();
    this.createHeatMap();
  }

  createHeatMap() {
    const {size, margin} = this.props;
    const preData = this.props.data;
    const width = size[0] - margin.left - margin.right;
    const height = size[1] -margin.top - margin.bottom;
    // consrtuct range
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
    const color = d3.scaleQuantile().range(colors);
    // format data
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December',];
    const data = preData.monthlyVariance.map( d => ({
      year: d.year,
      month: d.month-1,
      temperature: d.variance + preData.baseTemperature,
      variance: d.variance
    }));
    const [minYear, maxYear] = d3.extent(data, d => d.year);
    const [minMonth, maxMonth] = d3.extent(data, d => d.month);
    const [minTemp, maxTemp] = d3.extent(data, d => d.temperature);
    x.domain([minYear, maxYear]);
    y.domain([minMonth, maxMonth]);
    color.domain([minTemp, maxTemp]);

    const gridHeight = height/(maxMonth - minMonth + 1);
    const gridWidth = width/(maxYear - minYear + 1);
    // draw heatmap
    // add 
    const svg = d3.select(this.heatMap)
      .append('svg')
      .attr('width', size[0])
      .attr('height', size[1])
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // add axis
    // Add the X Axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(10));
    // text label for the x axis
    svg.append('text')
      .attr("x", width)
      .attr("y", height + 40)
      .style('text-anchor', 'middle')
      .text('Year');
    // Add the Y Axis
    svg.append('g')
    .selectAll('text')
    .data(Array.from(Array(12).keys()))
    .enter()
    .append('text')
    .attr('class', 'y-axis')
    .attr('x', -10)
    .attr('y', d => y(d))
    .attr('text-anchor', 'end')
    .text(d => months[d]);
    // text label for the y axis
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 10 - margin.left)
      .attr('x', 10)
      .attr('dy', '1em')
      .style('text-anchor', 'end')
      .text('Months');
    // add title
    // add titles
    const titles = ['Monthly Global Land-Surface Temperature','1753 - 2015', 'Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.', 'Estimated Jan 1951-Dec 1980 absolute temperature ℃: 8.66 +/- 0.07'];
    const fontSizes = [2, 1.5, 0.8, 0.8];
    const lineHeights = [0, 30, 50, 62, 74];
    svg.append('g')
      .attr('transform', `translate(0, ${0 - (margin.top / 2) - 40})`)
      .selectAll('.heatmap-title')
      .data(titles)
      .enter()
      .append('text')
      .attr('class', 'heatmap-title')
      .attr('text-anchor', 'middle')
      .style('font-size', (d ,i) => `${fontSizes[i]}em`)
      .attr('x', width/2)
      .attr('y', (d, i) => lineHeights[i] + 10)
      .text(d => d);

    // add rects and mouse event
    // Add event
    const tooltip = d3.select(this.heatMap)
      .append('div')
      .attr("class", "tooltip")
      .style("opacity", 0);
    const tipHTML = (d) => (
      `<span class="year">${d.year}-${months[d.month]}</span></br><span class="tmperature">${d.temperature.toFixed(3)}℃</span></br><span class="variance">${d.variance.toFixed(3)}℃</span>`);
    svg.selectAll('.rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'rect')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.month)-gridHeight)
      .attr('width', gridWidth)
      .attr('height', gridHeight)
      .style('fill', d => color(d.temperature))
      .on('mouseover', function(d) {
        tooltip.transition()
        .duration(200)
        .style('opacity', 0.9);
        tooltip.html(tipHTML(d)) 
        .style('left', `${d3.event.pageX+10}px`)
        .style('top', `${d3.event.pageY+10}px`);  
      })
      .on('mouseout', function(d) {
        tooltip.transition()
        .duration(500)
        .style('opacity', 0);
      });


    // legends
    const linearGradient = svg.append('linearGradient')
      .attr('id', 'linear-gradient');  
    linearGradient.selectAll('stop') 
      .data(color.range())                  
      .enter()
      .append('stop')
      .attr('offset', (d,i) => i/(color.range().length - 1))
      .attr('stop-color', d => d);

    svg.append('rect')
      .attr('width', 300)
      .attr('height', 20)
      .style('fill', 'url(#linear-gradient)')
      .attr('transform', `translate(${width/2-150}, ${height+40})`);

    svg.append('g')
      .selectAll('text')
      .data(Array.from(Array(13).keys()))
      .enter().append('text')
      .attr('class','temperatures')
      .attr('x', d => `${width/2-150 + 5 + (Math.ceil(300 / 13) * d)}`)
      .attr('y', `${height+40+40}`)
      .attr('text-anchor', 'middle')
      .text((d) => `${d - 6}`);
  }

  render() {
    return (
      <div className="heat-map" ref={node => this.heatMap = node}>

      </div>
    );
  }
}

HeatMap.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.array.isRequired,
  margin: PropTypes.object.isRequired,
};

export default HeatMap;
