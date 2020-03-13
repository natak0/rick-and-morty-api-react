import React, { Component } from 'react';
import Character from '../Components/Character/Character'
import CharacterDetails from '../Components/CharacterDetails/CharacterDetails';

class CharacterGridContainer extends Component { 
  constructor(props){
    //refer to the parent class constructor
    super(props);
    //use 'this' after parent call
    this.state = {
      error: null,
      isLoaded: false,
      apiPageInfo: [],
      characters: [],
      selectedCharacter: []
    }
  }

  componentDidMount () {
    fetch('https://rickandmortyapi.com/api/character/')
        .then(
         ( response ) => response.json())
        .then(
          ( result )=> {
            console.log(result);
            const characters = result.results;
            
            this.setState({ 
              characters: characters,
              isLoaded: true});
          },
            //handle API errors here to separate them from other bugs
          ( error ) => {
            this.setState({
              isLoaded: true,
              error
            })
        })
    }

    characterSelectedHandler = ( id, character ) => {
      console.log(id, character);
      this.setState({selectedCharacterId:id, selectedCharacter:character})
    }
    
    render() {
      const { error, isLoaded } = this.state;
      if ( error ) {
        return <div>Error: {error.message}</div>;
      } else if ( !isLoaded ) {
        return <div>Loading...</div>;
      } else {
          //render a map of characters from the state
          //and assign a click event to the div with an image
          const characters = this.state.characters.map((character) => {
            return (
              <Character
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
                    character={this.state.selectedCharacter}/>
                </div>    
              </div>
            </main>
          )
        }
    }
}

export default CharacterGridContainer;