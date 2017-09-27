import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './flags/flags.css';

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
    console.log('data:',data);
    const width = size[0] - margin.left - margin.right;
    const height = size[1] -margin.top - margin.bottom;
    // add svg
    const svg = d3.select(this.forceDirectedGraph)
    .append('svg')
    .attr('width', size[0])
    .attr('height', size[1])
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
    // add layout
    var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().distance(50))
    .force('charge', d3.forceManyBody().strength(-10))
  
    .force('center', d3.forceCenter(width / 2, height / 2));

    // add lines
    const tooltip = d3.select(this.forceDirectedGraph)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
    const tipHTML = d => (
        `<span>${d.country}</span>`
    );
    
    const dragstarted = d => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = d => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = d => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }; 
      
    const ticked = d => {
      node
      // .attr("cx", function(d) { return d.x = Math.max(4, Math.min(width - 4, d.x));})
      // .attr("cy", function(d) { return d.y = Math.max(4, Math.min(height - 4, d.y));});
      .style('left', d => { 
        d.x = Math.max(16, Math.min(width - 16, d.x)); 
        return `${d.x - 8 + margin.left}px`;
      })
      .style('top', d => { 
        d.y = Math.max(11, Math.min(height - 11, d.y)); 
        return `${d.y - 5 + margin.top}px`;
      });

      link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    

      };
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter().append('line');
    // add flagbox
    const flagbox = d3.select(this.forceDirectedGraph)
    .append('div')
    .attr('class', 'flag-box');
    const graph = d3.select(this.forceDirectedGraph);
    console.log('graph:',graph);
    
    const offsetTop = graph._groups[0][0].offsetTop;
    const offsetLeft = graph._groups[0][0].offsetLeft;
    const node = flagbox
      .selectAll('.node')
      .data(data.nodes)
      .enter()
      .append('img')
      .attr('class', 'node')
      .attr('class', d => 'flag flag-' + d.code)
      .on('mouseover', d => {
        tooltip.transition(200)
        .style('opacity', 0.9);
        tooltip.html(tipHTML(d))
        .style('left', `${d3.event.pageX - 10 - offsetLeft}px`)
        .style('top', `${d3.event.pageY - 30 - offsetTop}px`);
      })
      .on('mouseout', d => {
        tooltip.transition()
        .duration(500)
        .style('opacity', 0);
      })
      .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

    simulation
        .nodes(data.nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(data.links);


}

  render() {
    return (
      <div className="force-directed" ref={node => this.forceDirectedGraph = node}>

      </div>
    );
  }
}

ForceDirectedGraph.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.array.isRequired,
  margin: PropTypes.object.isRequired,
};

export default ForceDirectedGraph;
