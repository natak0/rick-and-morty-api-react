import React from 'react';
import CanvasJSReact from '../../lib/canvasjs.react';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const genderGraph = ({ counts }) => {
  //create dataPoints for a graph from gender counts
  const resultDataPoints = Object.keys(counts).map(function(key){
    return {label:key, y:counts[key]};
  });
  const options = {
    title: {
      text: "Characters Gender Graph"
    },
    data: [{
      type: "column",
      dataPoints: resultDataPoints
    }]
  } 
  return (
    <div className="genderGraph">
      <CanvasJSChart options = {options} />
    </div>
  ) 
}

export default genderGraph;