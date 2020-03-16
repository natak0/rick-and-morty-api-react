import React, { Component, useState, useEffect } from 'react';
import Character from '../Components/Character/Character';
import Pagination from './Pagination';
import CharacterDetails from '../Components/CharacterDetails/CharacterDetails';
import GenderGraph from '../Components/Graphs/GenderGraph';
import character from '../Components/Character/Character';

class CharacterGridContainer extends Component { 
  constructor(props){
    //refer to the parent class constructor
    super(props);
    //use 'this' after parent call
    this.state = {
      error: null,
      isLoaded: false,
      apiURL: 'https://rickandmortyapi.com/api/character/?page=1',
      apiURLnext: null,
      apiURLprev: null,
      dataInfo: [],
      characters: [],
      selectedCharacter: [],
      selectedCharacterId: null
    }
  }

  componentDidMount () {
    this.apiFetch(this.state.apiURL);
  }
  
  componentDidUpdate () {
    if (this.state.apiURLnext === this.state.dataInfo.next){
      const apiURL = this.state.apiURLnext;
      this.state.apiURLnext = null;
      this.apiFetch(apiURL)
      }
    else if (this.state.apiURLprev === this.state.dataInfo.prev){
      const apiURL = this.state.apiURLprev;
      this.state.apiURLprev = null;
      this.apiFetch(apiURL)
    }
  }

  apiFetch = ( apiURL ) => {
    fetch(apiURL)
      .then(
        //call the json function and return a promise
        ( response ) => response.json())
      .then(
        ( result )=> {
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
    this.setState({selectedCharacterId:id, selectedCharacter:character})
  }

  genderCounter = ( characters ) => {
    //create a map object of characters genders
    const gender = this.state.characters.map((character) => {
      return character.gender
    });
    //count number of each gender
    let counter = {};
    gender.forEach(element => {
      counter[element] = (counter[element] || 0)+1; 
    });
    return counter;
  }
    
    render() {
/*    //try useEffect insted of mount/update   
      const [apiURL, apiURLnext] = useState(0);
      useEffect(() => {
        this.apiFetch(this.state.apiURL)
      }) */

      //if there are errors with api request:
      const { error, isLoaded } = this.state;
      if ( error ) {
        return <div>Error: {error.message}</div>;
      } else if ( !isLoaded ) {
        return <div>Loading...</div>;

      //if there are no errors with api request:
      } else {
          //render a map of characters from the state
          //and assign a click event to the div with an image
          const characters = this.state.characters.map((character) => {
            return (
              <Character
                image={character.image}
                clicked={() => this.characterSelectedHandler(character.id, character)}/> 
            )
          }); 
          console.log("characters",characters)
          return(
            <div>
              {/* setState in another component? */}
              <div>
                <button onClick={() => this.setState({ apiURLprev: this.state.dataInfo.prev })}>prev</button>
                <button onClick={() => this.setState({ apiURLnext: this.state.dataInfo.next })}>next</button>
              </div>
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
                  <GenderGraph counts={this.genderCounter(characters)}/>   
                </div>
              </main>
            </div>
          )
        }
    }
}

export default CharacterGridContainer;