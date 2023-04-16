import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { select, selectAll } from 'd3-selection';
import { forceSimulation, forceManyBody, forceCenter, forceLink, forceCollide } from 'd3-force';
import { zoom } from 'd3-zoom';
import { drag } from 'd3-drag';

function ForceGraph({ data, properties }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 400;

    const nodes = data.map((d, i) => ({ id: i, ...d }));
    const links = identifyLinks(data, properties);

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('collision', d3.forceCollide().radius(25).strength(0.5));

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#000000") // set line color
      .attr("stroke-width", "2px"); // set line thickness

      const node = svg.selectAll('.node')
      .data(nodes)
      .join("circle")
      .attr('class', 'node')
      .attr('r', 20)
      .style('fill', 'steelblue')
      .attr('stroke', '#000') // set node stroke color
      .attr('stroke-width', '2px') // set node stroke thickness
      .call(drag(simulation)); // enable dragging on nodes
    

    const zoomBehavior = d3.zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', zoomed);

    svg.call(zoomBehavior);

    function zoomed(event) {
      svg.attr('transform', event.transform);
    }

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.5).restart();
        d.fx = d.x;
        d.fy = d.y;
        simulation.force('link', null);
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
    console.log(JSON.stringify(links))
  }, [data, properties]);  

  return (
    <svg ref={svgRef}></svg>
  );
}



function identifyLinks(data, properties) {
    const nodes = data.map((d, i) => ({ id: i, ...d }));
    const links = [];
    const seenPairs = new Set();
  
    nodes.forEach((sourceNode, sourceIndex) => {
      nodes.forEach((targetNode, targetIndex) => {
        if (sourceNode.id !== targetNode.id) {
          properties.forEach(property => {
            if (
              Array.isArray(sourceNode[property]) &&
              Array.isArray(targetNode[property])
            ) {
              sourceNode[property].forEach(sourceItem => {
                targetNode[property].forEach(targetItem => {
                  if (
                    Object.keys(sourceItem).length ===
                    Object.keys(targetItem).length
                  ) {
                    let linkFound = true;
                    Object.keys(sourceItem).forEach(itemKey => {
                      if (sourceItem[itemKey] !== targetItem[itemKey]) {
                        linkFound = false;
                      }
                    });
                    if (linkFound) {
                      const pair = `${sourceNode.id}-${targetNode.id}`;
                      const reversedPair = `${targetNode.id}-${sourceNode.id}`;
                      if (
                        !seenPairs.has(pair) &&
                        !seenPairs.has(reversedPair)
                      ) {
                        seenPairs.add(pair);
                        links.push({ source: sourceIndex, target: targetIndex });
                        alert('inner triggered')
                      }
                    }
                  }
                });
              });
            } else if (sourceNode[property] === targetNode[property]) {
              const pair = `${sourceNode.id}-${targetNode.id}`;
              const reversedPair = `${targetNode.id}-${sourceNode.id}`;
              let temp = sourceNode['search'][0]
              console.log('source',sourceNode._id)
              console.log('target',targetNode._id)
              if (!seenPairs.has(pair) && !seenPairs.has(reversedPair) && temp[Object.keys(temp)[0]].length > 0 && sourceNode._id !== targetNode._id) {
                seenPairs.add(pair);
                links.push({ source: sourceIndex, target: targetIndex });
              }
            }
          });
        }
      });
    });
  
    return links;
  }
  
  
  
  

export default ForceGraph;