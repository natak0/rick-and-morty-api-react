import React from 'react';
import DetailsSidebar from './DetailsSidebar';

const CharacterGridContainer = (resultsData) => {
  
  //display the details of the clicked image
  const displayDetailsHandler = (index, imageUrl) => {
    console.log('display something', index, imageUrl)
    return (
      document.querySelector('#character-poster').src=imageUrl
    )     
  }
  
  return (
    <section id='character-grid'> {
      resultsData.resultsData.map((item, index) => (
        <div 
          className="character-grid"
          id={item.id}
          key={index}
          data-name={item.name}
          data-species={item.species}
          data-location={item.location.name}
          data-gender={item.gender}>
          <img 
            className="character-poster"
            src={item.image}
            alt="character image"
            onClick={() => displayDetailsHandler(item.id, item.image)}>
          </img>
          {item.name}
        </div>
      )) 
    } 
    </section>
  )
} 

export default CharacterGridContainer;