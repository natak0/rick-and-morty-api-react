import React from 'react';
import CanvasJSReact from '../../lib/canvasjs.react';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const genderGraph = ({characters}) => {
  //const characters = props.characters;
  if (characters) {
    const genderCounter = (characters) => {
      //create a map object of characters genders
      const gender = characters.map((character) => {
        return character.gender
      });
      //count number of each gender
      let counter = {};
      gender.forEach(element => {
        counter[element] = (counter[element] || 0)+1; 
      });
      return counter;
    };

    //create dataPoints for a graph from gender counts
    let counts = genderCounter(characters);
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
}

export default genderGraph;