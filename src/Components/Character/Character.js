import React from 'react';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

const character = ( props ) => (
//add selected class to the clicked element
<div 
  className={"character-grid "+(props.selected?"selected":"")} 
  onClick={props.clicked}>
    {/* <img 
      className="character-poster"
      src={props.image}
      alt="character">
    </img>
    {(props.selected?
    <div className="character-details-media">
      <h1>{props.character.name}</h1>
      <p>Gender: {props.character.gender}</p>
      <p>Species: {props.character.species}</p>
      <p>Status: {props.character.status}</p>
      <p>Location: {props.character.location.name}</p>
    </div>:null)} */}
    <CharacterDetails character={props.character} selected={props.selected}/>
</div>
)
 
export default character;