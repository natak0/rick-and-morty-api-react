import React, { Component } from 'react';
import Character from '../Components/Character'
import DetailsSidebar from './DetailsSidebar';


const CharacterGridContainer = (resultsData, {updateSidebar}) => { 

  updateSidebar = item => {
    //const { sidebar } = this.state.sidebar;
    console.log("clicked", item);
    return (
    <Character item={item} />)
  }

  const characters = Array.from(resultsData.resultsData);
      console.log('characters', characters);

  return (
    
    <section id='character-grid'> {
      
      
      /* characters.map((character, index) =>  {
        return (<Character character={character.name}/>)
      }) */
      characters.map((item, index) => (
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
            onClick={() => updateSidebar(item)}>
          </img>
         {/*  <Character name={item.name} image={item.image} /> */}
          {item.name}
          
        </div>
      ))  
    } */
  }
    </section>
  )
}  

export default CharacterGridContainer;