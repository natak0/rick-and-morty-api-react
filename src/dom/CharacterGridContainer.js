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
      selectedCharacter: [],
      selectedCharacterId: null
    }
  }

  componentDidMount () {
    this.apiFetch(this.state.apiURL);
  }

  apiFetch = (apiURL) => {
    fetch(apiURL)
      .then(
        //call the json function and return a promise
        (response) => response.json())
      .then(
        (result)=> {
          const characters = result.results;
          const dataInfo = result.info;
          //modify the received data for the first and the last page of api results
          //to correctly update next and previous buttons
          if (dataInfo.prev === '') {dataInfo.prev = this.state.apiURLbase+'?page='+dataInfo.pages};
          if (dataInfo.next ==='') {dataInfo.next = this.state.apiURLbase+'?page=1'};
          //add the current page address to the data
          dataInfo.current = apiURL;
          //create URL for search
          const apiURLsearch = this.state.apiURLbase+'1,'+dataInfo.count;
          this.setState({ 
            characters: characters,
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
      })
  }

  characterSelectedHandler = (id, character) => {
    this.setState({selectedCharacterId:id, selectedCharacter:character})
  }

  searchHandler = (name) =>{
    let newUrl=this.state.apiURLbase+'?name='+name;
    console.log(" url "+newUrl)
    this.setState({apiURL:this.state.apiURLbase+'?name='+name})
    this.apiFetch(newUrl)
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
/*    //try useEffect insted of mount/update   
      const [apiURL, apiURLnext] = useState(0);
      useEffect(() => {
        this.apiFetch(this.state.apiURL)
      }) */

      //if there are errors with api request:
      const {error, isLoaded} = this.state;
      if ( error ) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
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
          return(
            <div>
              {/* is it possible in another component? */}
              <div className="pagination">
                <div>
                  <button onClick={() => {this.apiFetch(this.state.apiURLbase+'?page=1')}}>home</button>
                  <button onClick={() => this.apiFetch(this.state.dataInfo.prev)}>prev</button>
                  <span className="current-page">{this.currentPageNumber(this.state.dataInfo.current, this.state.dataInfo.pages)}</span>
                  <button onClick={() => this.apiFetch(this.state.dataInfo.next)}>next</button>
                </div>
                  <Search searchHandler={() => this.searchHandler}/>
              </div> 
              
              {/* <Pagination info={this.state.dataInfo}/> */}
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
