import React from 'react';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

const character = ( props ) => (
//add selected class to the clicked element
<div 
  className={"character-grid "+(props.selected?"selected":"")} 
  onClick={props.clicked}>
    <CharacterDetails character={props.character} selected={props.selected}/>
</div>
)
 
export default character;