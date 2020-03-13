import React from 'react';

const Character = ( props ) => (
<div>
     <h1>props name {props.name}</h1>
     <img 
            className="character-poster"
            src={props.image}
            alt="character image"
            >
          </img>
          </div>
)


export default Character;