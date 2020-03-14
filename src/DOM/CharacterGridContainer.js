import React, { Component } from 'react';
import Character from '../Components/Character/Character';
import Pagination from './Pagination';
import CharacterDetails from '../Components/CharacterDetails/CharacterDetails';
import GenderGraph from '../Components/Graphs/GenderGraph';

class CharacterGridContainer extends Component { 
  constructor(props){
    //refer to the parent class constructor
    super(props);
    //use 'this' after parent call
    this.state = {
      error: null,
      isLoaded: false,
      apiURL: 'https://rickandmortyapi.com/api/character/?page=2',
      dataInfo: [],
      characters: [],
      selectedCharacter: [],
      selectedCharacterId: null
    }
  }

  componentDidMount () {
    fetch(this.state.apiURL)
        .then(
          //call the json function and return a promise
         ( response ) => response.json())
        .then(
          ( result )=> {
            //console.log(result);
            const characters = result.results;
            const dataInfo = result.info;
            this.setState({ 
              characters: characters,
              dataInfo: dataInfo,
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

    genderCounter = ( gender ) => {
    //count number of each gender
      let counter = {};
      gender.forEach(element => {
        counter[element] = (counter[element] || 0)+1; 
      });
      return counter;
    }
    
    render() {
      const { error, isLoaded } = this.state;
      console.log(this.state.dataInfo);
      if ( error ) {
        return <div>Error: {error.message}</div>;
      } else if ( !isLoaded ) {
        return <div>Loading...</div>;
      } else {
          //render a map of characters from the state
          //and assign a click event to the div with an image
          const characters = this.state.characters.map((character) => {
            //const genders = character.gender;
            return (
              <Character
                image={character.image}
                clicked={() => this.characterSelectedHandler(character.id, character)}
            /> 
            )
          }); 
          const gender = this.state.characters.map((character) => {
            return character.gender
          });
          const genderCounter = this.genderCounter(gender);
          return(
            <div>
              <Pagination info={this.state.dataInfo}/>
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
                  <GenderGraph counts={genderCounter}/>   
                </div>
              </main>
            </div>
          )
        }
    }
}

export default CharacterGridContainer;