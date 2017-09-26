import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class ForceDirectedGraph extends React.Component {
  constructor(props) {
    super(props);
    this.createForceDirectedGraph = this.createForceDirectedGraph.bind(this);
  }

  componentDidMount() {
    d3.select(this.forceDirectedGraph).selectAll('*').remove();
    this.createForceDirectedGraph();
  }
  
  componentDidUpdate() {
    d3.select(this.forceDirectedGraph).selectAll('*').remove();
    this.createForceDirectedGraph();
  }

  createForceDirectedGraph() {
    const { data, size, margin} = this.props;
    const width = size[0] - margin.left - margin.right;
    const height = size[1] -margin.top - margin.bottom;
    // consrtuct range
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    
    // format data
    const formatTime = d3.timeFormat('%H:%M');
    const formatMinutes = d => {
      const t = new Date(2012, 0, 1, 0, d);
      return formatTime(t);
    };

    const xMin = d3.min(data, d => d.Seconds);
    data.forEach(d => {
      d.behind = d.Seconds - xMin;
      d.Place = +d.Place;
    });
    x.domain([60 * 3.5, 0]);
    y.domain([d3.max(data, d => d.Place)+1, 1]);
    // draw ForceDirectedGraph
    // add ForceDirectedGraph
    const svg = d3.select(this.forceDirectedGraph)
      .append('svg')
      .attr('width', size[0])
      .attr('height', size[1])
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // add axis
    // Add the X Axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(formatMinutes));
    // text label for the x axis
    svg.append('text')
      .attr("x", width / 2 )
      .attr("y", height + 40)
      .style('text-anchor', 'middle')
      .text('Minutes Behind Fastest Time');
    // Add the Y Axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(Number.parseInt(data.length/5, 10)));
    // text label for the y axis
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 10 - margin.left)
      .attr('x', 10)
      .attr('dy', '1em')
      .style('text-anchor', 'end')
      .text('Ranking');
    // add title
    // add titles
    const titles = ['Doping in Professional Bicycle Racing', '35 Fastest times up Alpe d\'Huez', 'Normalized to 13.8km distance'];
    svg.append('g')
      .attr('transform', `translate(0, ${0 - (margin.top / 2) - 10})`)
      .selectAll('.plot-title')
      .data(titles)
      .enter()
      .append('text')
      .attr('class', 'plot-title')
      .attr('text-anchor', 'middle')
      .style('font-size', (d ,i) => `${(1.9 - 0.5 * i)}em`)
      .attr('x', width/2)
      .attr('y', (d, i) => 30 * i + 20)
      .text(d => d);

    // add ForceDirectedGraphs and mouse event
    // Add event
    const tooltip = d3.select(this.forceDirectedGraph)
      .append('div')
      .attr("class", "tooltip")
      .style("opacity", 0);
    const tipHTML = (d) => (
      `<span>${d.Name}: ${d.Nationality}</span></br><span>Year: ${d.Year}, time: ${d.Seconds}</span></br><span>${d.Doping}</span>`);
    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', '.dot')
      .attr('cx', d => x(d.behind))
      .attr('cy', d => y(d.Place))
      .attr('r', 5)
      .style('fill', d => (d.Doping === '' ? 'black' : 'red'))
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

    // dots' label 
    svg.selectAll('.dot-text')
      .data(data)
      .enter()
      .append('text')
      .attr('class','dot-text')
      .attr('x', d => x(d.behind) + 10)
      .attr('y', d => y(d.Place) + 5)
      .text(d => d.Name);

    // labeling dots
    const appendCircle = (cx, cy, r, fillColor) => {
      svg.append('circle')
      .attr('class', 'dot')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .style('fill', fillColor);
    };
    const appendText = (x, y, content, className) => {
      svg.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('class', className)
      .attr('text-anchor', 'left')
      .text(content);
    };
    const labels = ['No doping allegations', 'Riders with doping allegations'];
    appendCircle(width - 150, height / 2, 5, 'black');
    appendText(width - 135, height / 2 + 5, labels[0], 'ForceDirectedGraph-label');
    appendCircle(width - 150, (height / 2) + 30, 5, 'red');
    appendText(width - 135, (height / 2) + 35, labels[1], 'ForceDirectedGraph-label');
  }

  render() {
    return (
      <div className="force-directed" ref={node => this.forceDirectedGraph = node}>

      </div>
    );
  }
}

ForceDirectedGraph.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.array.isRequired,
  margin: PropTypes.object.isRequired,
};

export default ForceDirectedGraph;
