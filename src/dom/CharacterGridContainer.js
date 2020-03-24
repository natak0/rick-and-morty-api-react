import React, { Component, useState, useEffect } from 'react';
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
      dataInfo: [], 
      characters: [],
      selectedCharacter: []
    }
  }

  componentDidMount () {
    this.setState({
      isLoaded: false
    }, () => {
      this.apiFetch(this.state.apiURL);
    })
    
  }
  apiFetch = (apiURL) => {
    //this.setState({isLoaded:false});
    fetch(apiURL)
      .then(
        //call the json function and return a promise
        (response) => response.json())
      .then(
        (result)=> {
          if(result.error){
            this.setState({ 
              error: result.error,
              isLoaded: true,
            });
            return
          }
          const characters = result.results;
          const dataInfo = result.info;
          //modify the received data for the first and the last page of api results
          //to correctly update next and previous buttons
          /* if (dataInfo.prev === '') {dataInfo.prev = this.state.apiURLbase+'?page='+dataInfo.pages};
          if (dataInfo.next === '') {dataInfo.next = this.state.apiURLbase+'?page=1'}; */
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
          console.log('api error')
          this.setState({
            isLoaded: true,
            error
          })
      })
  }

  characterSelectedHandler = (character) => {
    this.setState({selectedCharacter:character});
  }

  searchHandler = (name) =>{
    let newUrl=this.state.apiURLbase+'?name='+name;
    this.apiFetch(newUrl);
  }

  genderCounter = (characters) => {
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

  currentPageNumber = (apiURL, pages) => {
    //use regular expression to get the number of the current page from the api address
    let pageNum = apiURL.match(/[0-9]+/g); 
    if (pageNum === null) {
      pageNum = 1;
    }
    return ' page '+ pageNum+'/'+pages;
  }
  
  render() {
      const {error, isLoaded} = this.state;
      console.log(error, isLoaded);
      if (!isLoaded) {
        return <div>Loading...</div>;
      } 
      
          //render a map of characters from the state
          //add selected boolean to clicked element
          //assign a click event to the div with an image
        const characters = this.state.characters.map((character) => {
          return (
            <Character
              image={character.image}
              selected={this.state.selectedCharacter.id===character.id?true:false}
              clicked={() => this.characterSelectedHandler(character)}
              character={character}/> 
          )
        }); 
        return(
          <div>
            {( !isLoaded )? (<p>Loading...</p>):<p></p>}
            <div className="nav-top__search">
              <a role="button" aria-label="home" onClick={() => {this.apiFetch(this.state.apiURLbase+'?page=1')}}><span className="home-icon" ></span></a>
              <Search searchHandler={() => this.searchHandler} error={error}/>
              {console.log(error, isLoaded)}
            </div>
            {( error )? (<div className="nav-top__results">No results</div>):
              <div>
                  <div className="nav-top__pagination">
                    <button disabled={!this.state.dataInfo.prev} onClick={() => this.apiFetch(this.state.dataInfo.prev)}>prev</button>
                    <span className="current-page">{this.currentPageNumber(this.state.dataInfo.current, this.state.dataInfo.pages)}</span>
                    <button disabled={!this.state.dataInfo.next} onClick={() => this.apiFetch(this.state.dataInfo.next)}>next</button>
                  </div>
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
                      <GenderGraph counts={this.genderCounter(characters)}/>   
                  </div>
                </main>
              </div>
          }
          </div>
        )
      }
    }


export default CharacterGridContainer;
