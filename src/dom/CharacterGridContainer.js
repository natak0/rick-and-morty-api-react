import React, { Component, useState, useEffect } from 'react';
import Navigation from '../Components/Navigation/Navigation'
import Character from '../Components/Character/Character';
import CharacterDetails from '../Components/CharacterDetails/CharacterDetails';
import GenderGraph from '../Components/Graphs/GenderGraph';
import Search from '../Components/Search/Search';

class CharacterGridContainer extends Component { 
  constructor(props){
    //refer to the parent class constructor
    super(props);
    //use 'this' after parent call
    this.state = {
      error: null,
      isLoaded: false,
      apiURLbase: 'https://rickandmortyapi.com/api/character/',
      apiURL: 'https://rickandmortyapi.com/api/character/?page=1',
      apiURLsearch: null,
      apiURLnext: null,
      apiURLprev: null,
      dataInfo: null, 
      characters: [],
      selectedCharacter: null
    }
  }

  componentDidMount () {
    this.apiFetch(this.state.apiURL);
  }
  apiFetch = (apiURL) => {
    this.setState({isLoaded:false},()=>{
      fetch(apiURL)
      .then(
        //call the json function and return a promise
        (response) => response.json())
      .then(
        (result)=> {
          if(result.error){
            this.setState({ 
              error: result.error,
              isLoaded: true
            });
            return
          }
          const characters = result.results;
          const dataInfo = result.info;
          //add the current page address to the data
          dataInfo.current = apiURL;
          //create URL for search
          const apiURLsearch = this.state.apiURLbase+'1,'+dataInfo.count;
          this.setState({ 
            error:null,
            characters: characters,
            selectedCharacter:characters[0],
            dataInfo: dataInfo,
            isLoaded: true,
            apiURL: apiURL,
            apiURLsearch: apiURLsearch
          });  
        },
        //handle API errors here to separate them from other bugs
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
    });
  }

  characterSelectedHandler = (character) => {
    this.setState({selectedCharacter:character});
  }

  searchHandler = (name) =>{
    let newUrl=this.state.apiURLbase+'?name='+name;
    this.apiFetch(newUrl);
  }
  
  render() {
      const {error, isLoaded, characters, dataInfo} = this.state;
      //render a map of characters from the state
      //add selected boolean to clicked element
      //assign a click event to the div with an image
      const persons = characters.map((character, key) => {
        return (
          <Character
            key={character.id}
            image={character.image}
            selected={this.state.selectedCharacter.id===character.id?true:false}
            clicked={() => this.characterSelectedHandler(character)}
            character={character}/> 
        )
        }); 
        
      return(
        <div>
          <div className="nav-top__search">
            <a role="button" aria-label="home" href='#' onClick={() => {this.apiFetch(this.state.apiURLbase+'?page=1')}}><span className="home-icon" ></span></a>
            <Search searchHandler={() => this.searchHandler}/>
            {( !isLoaded )? (<p className="nav-top__error">Loading...</p>):<p> </p>}
          </div>
          {( error )? (<div className="nav-top__results">No results</div>):
            <div>
              {(isLoaded)?(<Navigation dataInfo={dataInfo} apiFetch={this.apiFetch}/>):null}
              <main id="main-content" className="content-main"> 
                <div id="character-container">
                  <section id="character-container-grid">
                    {persons}
                  </section> 
                </div>
                <div className="sidebar">
                  <div className="details">
                    {(isLoaded)?(<CharacterDetails 
                      character={this.state.selectedCharacter}/>):""}
                  </div> 
                    {/* <GenderGraph counts={this.genderCounter(characters)}/>  */} 
                    {(isLoaded)?(<GenderGraph 
                      characters={this.state.characters}/>):""} 
                </div>
              </main>
            </div>
        }
        </div>
      )
      }
    }

export default CharacterGridContainer;
