import React, { Component } from 'react';
import Character from '../Components/Character/Character'
import CharacterDetails from '../Components/CharacterDetails/CharacterDetails';
//import CharacterDetails from '../Components/CharacterDetails';


class CharacterGridContainer extends Component { 
  state = {
    apiPageInfo: [],
    characters: [],
    selectedCharacter: [],
    selectedCharacterId: null
  }

  componentDidMount () {
    fetch('https://rickandmortyapi.com/api/character/')
        .then(
          response => response.json())
        .then( result => {
          console.log(result);
          const characters = result.results;
          //const apiPageInfo = result.info;
          this.setState({ characters: characters});
          //console.log(characters);
        }
      )
    }

    characterSelectedHandler = ( id, character ) => {
      console.log(id, character);
      this.setState({selectedCharacterId:id, selectedCharacter:character})
    }
    
    render() {
      const characters = this.state.characters.map((character) => {
        return (
          <Character
            name={character.name}
            status={character.state}
            image={character.image}
            clicked={() => this.characterSelectedHandler(character.id, character)}
        /> 
        )
      }); 

      return(
        <main id="main-content" className="content-main"> 
          <div id="character-container">
            <section id="character-container-grid">
              {characters}
            </section> 
          </div>
          <div className="sidebar">
            <div className="details">
              <CharacterDetails 
                id={this.state.selectedCharacterId} 
                character={this.state.selectedCharacter}/>
            </div>    
          </div>
        </main>
      )
    }
}

export default CharacterGridContainer;