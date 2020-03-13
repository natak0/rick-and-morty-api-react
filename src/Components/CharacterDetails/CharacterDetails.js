import React, { Component } from 'react';

class CharacterDetails extends Component {

  render() {
    let character = 
      <div className="character-details">
      <p>Select a character</p>
      </div>
    if ( this.props.character ){
      character = 
      <div className="character-details">
        <h1>{this.props.character.name}</h1>
          <img 
            className="character-poster"
            id="character-poster"
            src={this.props.character.image}
            alt="character image">
        </img>
		  </div>
    }
  return character;    
  }
}

export default CharacterDetails;