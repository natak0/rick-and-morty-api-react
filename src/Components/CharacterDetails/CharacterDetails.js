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
        <p>{this.props.character.gender}</p>
        <p>{this.props.character.species}</p>
        <p>{this.props.character.status}</p>
       {/*  <p>{this.props.character.location}</p> */}
		  </div>
    }
  return character;    
  }
}

export default CharacterDetails;