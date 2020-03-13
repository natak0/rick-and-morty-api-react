import React from 'react';

const character = ( props ) => (
<div className="character-grid" onClick={props.clicked}>
     <img 
            className="character-poster"
            src={props.image}
            alt="character image"
            >
      </img>
</div>
)
 
export default character;