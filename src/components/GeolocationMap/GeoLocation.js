import React from 'react';
import PropTypes from 'prop-types';
import * as topojson from 'topojson-client';
import worldMap from './data/world-50m.v1.json';
import * as d3 from 'd3';

class GeolocationMap extends React.Component {
  constructor(props) {
    super(props);
    this.createGeolocationMap = this.createGeolocationMap.bind(this);
  }

  componentDidMount() {
    d3.select(this.GeolocationMap).selectAll('*').remove();
    this.createGeolocationMap();
  }
  
  componentDidUpdate() {
    d3.select(this.GeolocationMap).selectAll('*').remove();
    this.createGeolocationMap();
  }

  createGeolocationMap() {
    const { data, size, margin} = this.props;
    const width = size[0] - margin.left - margin.right;
    const height = size[1] -margin.top - margin.bottom;
    
    // draw GeolocationMap
    // add GeolocationMap
    const svg = d3.select(this.geolocationMap)
      .append('svg')
      .attr('width', size[0])
      .attr('height', size[1]);

    // zoom handler
    const zoomed = () => {
      map.attr("transform", d3.event.transform);
      meteorites.attr('transform', d3.event.transform);
    };
    
    const projection = d3.geoMercator()
      .scale((width-3) / (2 * Math.PI))
      .translate([width / 2 , height / 2]);
  
    const zoom = d3.zoom()
      .scaleExtent([.5, 18])
      .on('zoom', zoomed);
    
    const path = d3.geoPath()
      .projection(projection);
    // Set background color
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#266D98')
      .call(zoom);
    
      // add tooltip
    const tooltip = d3.select(this.geolocationMap)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
    const tipHTML = d => (
      `<span>fall: ${d.properties.fall}</span></br>` + 
      `<span>mass: ${d.properties.mass}</span></br>` + 
      `<span>name: ${d.properties.name}</span></br>` + 
      `<span>nametype: ${d.properties.nametype}</span></br>` + 
      `<span>recclass: ${d.properties.recclass}</span></br>` + 
      `<span>reclat: ${d.properties.reclat}</span></br>` + 
      `<span>year: ${d.properties.year}</span></br>`
    );
    // add map
    const map = svg.append('g')
      .selectAll('.path')
      .data(topojson.feature(worldMap, worldMap.objects.countries).features)
      .enter()
      .append('path')
      .attr('class', 'path')
      .attr('fill', '#95E1D3')
      .attr('stroke', '#266D98')
      .attr('d', path);

    const colors = {};
    let hue = 0;
    // add meteories
    data.features.sort((a,b) => ( new Date(a.properties.year) - new Date(b.properties.year) ));
    data.features.forEach( e => {
      hue += .35;
      colors[e.properties.year] = hue;
      e.color = 'hsl(' + hue + ',100%, 50%)';
    });
  
    data.features.sort((a,b) => (b.properties.mass - a.properties.mass));
  
    const meteorites = svg.append('g')
      .selectAll('path')
      .data(data.features)
      .enter()
      .append('circle')
      .attr('cx', d => ( projection([d.properties.reclong,d.properties.reclat])[0] ))
      .attr('cy', d => ( projection([d.properties.reclong,d.properties.reclat])[1] ))
      .attr('r', d => { 
        const range = 718750/2/2;
      
        if (d.properties.mass <= range) return 2;
        else if (d.properties.mass <= range*2) return 10;
        else if (d.properties.mass <= range*3) return 20;
        else if (d.properties.mass <= range*20) return 30;
        else if (d.properties.mass <= range*100) return 40;
        return 50;
      })
      .attr('fill-opacity', function(d) {
        const range = 718750/2/2;
        if (d.properties.mass <= range) return 1;
        return .5;
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#EAFFD0')
      .attr('fill', d => d.color )
      .on('mouseover', function(d) {
        d3.select(this).attr('d', path).style('fill', 'black');
        // Show tooltip
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
          tooltip.html(tipHTML(d))
          .style('left', (d3.event.pageX + 30) + 'px')
          .style('top', (d3.event.pageY/1.5) + 'px');
        })
      .on('mouseout', function(d) {
        // Reset color of dot
        d3.select(this).attr('d', path).style('fill', d => d.color );

        // Fade out tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

   
  }

  render() {
    return (
      <div className="geolocation-map" ref={node => this.geolocationMap = node}>

      </div>
    );
  }
}

GeolocationMap.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.array.isRequired,
  margin: PropTypes.object.isRequired,
};

export default GeolocationMap;
