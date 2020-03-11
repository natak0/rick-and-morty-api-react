import React from 'react';
import DetailsSidebar from './DetailsSidebar';


const CharacterGridContainer = (resultsData, updateFunction) => { 
  return (
    <section id='character-grid'> {
      resultsData.resultsData.map((item, index) => (
        <div 
          className="character-grid"
          id={item.id}
          key={index}
         /*  data-name={item.name}
          data-species={item.species}
          data-location={item.location.name}
          data-gender={item.gender} */>
          <img 
            className="character-poster"
            src={item.image}
            alt="character image"
            onClick={() => this.updateFunction(item.id, item)}>
          </img>
          {item.name}
        </div>
      )) 
    } 
    </section>
  )
} 

export default CharacterGridContainer;