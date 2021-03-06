import React from 'react';

const CharacterDetails = (props) => {
  
  return props.character?(
    //if the character was clicked, display details of the clicked character
      <div className="character-item">
        <img 
            className="character-poster"
            id="character-poster"
            src={props.character.image}
            alt="character">
        </img>
        <div className="character-details">
          <h1>{props.character.name}</h1>
          <p>Gender: {props.character.gender}</p>
          <p>Species: {props.character.species}</p>
          <p>Status: {props.character.status}</p>
          <p>Location: {props.character.location.name}</p>
        </div>
      </div>
):""}

export default CharacterDetails;