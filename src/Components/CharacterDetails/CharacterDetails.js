import React, { Component } from 'react';

class CharacterDetails extends Component {

  render() {
    let character = 
      <div className="character-details">
        <p>Select a character</p>
      </div>

    //if the character was clicked, display details of the clicked character
    if ( this.props.character.id ){
      character = 
      <div className="character-details">
        <h1>{this.props.character.name}</h1>
        <img 
            className="character-poster"
            id="character-poster"
            src={this.props.character.image}
            alt="character">
        </img>
        <p>Gender: {this.props.character.gender}</p>
        <p>Species: {this.props.character.species}</p>
        <p>Status: {this.props.character.status}</p>
        <p>Location: {this.props.character.location.name}</p>
		  </div>
    }
  return character;    
  }
}

export default CharacterDetails;