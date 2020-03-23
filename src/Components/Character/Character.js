import React from 'react';

const character = ( props ) => (
//add selected class to the clicked element
<div className={"character-grid "+(props.selected?"selected":"")} onClick={props.clicked}>
     <img 
            className="character-poster"
            src={props.image}
            alt="character">
      </img>
</div>
)
 
export default character;