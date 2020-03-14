import React, { Component } from 'react';
import CanvasJSReact from '../../lib/canvasjs.react';

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GenderGraph extends Component {
  render() {
    const counts = this.props.counts;
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
        /* [
          {label:"female", y: counts.Female},
          {label:"male", y: counts.Male},
          {label:"unknown", y: counts.unknown}  
        ] */
      }]
    } 
    return (
      <div>
        <CanvasJSChart options = {options} />
      </div>
    ) 
  }
}

export default GenderGraph;