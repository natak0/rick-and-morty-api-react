import React, { Component, useState, useEffect } from 'react';
import Navigation from '../Components/Navigation/Navigation'
import Character from '../Components/Character/Character';
import CharacterDetails from '../Components/CharacterDetails/CharacterDetails';
import GenderGraph from '../Components/Graphs/GenderGraph';
import Search from '../Components/Search/Search';

export const CharacterGridContainer = () => { 
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [urlBase] = useState('https://rickandmortyapi.com/api/character/');
  const [url, setUrl] = useState('https://rickandmortyapi.com/api/character/?page=1');
  const [urlSearch, setUrlSearch] = useState(null);
  const [urlNext, setUrlNext] = useState(null);
  const [urlPrev, setUrlPrev] = useState(null);
  const [dataInfo, setDataInfo] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState([]);
  /*     this.state = {
      error: null,
      isLoaded: false,
      urlbase: 'https://rickandmortyapi.com/api/character/',
      url: 'https://rickandmortyapi.com/api/character/?page=,
      urlsearch: null,
      apiURLnext: null,
      apiURLprev: null,
      dataInfo: null, 
      characters: [],
      selectedCharacter: null
    } */
  
    useEffect(() => {
      apiFetch(url)
    }, [url]);
/* 
  componentDidMount () {
    this.apiFetch(this.state.apiURL);
  } */
  async function apiFetch(url) {
     
      const response = await fetch(url)       
      .catch(err => {
        setError(err); console.log('error', err)
    });
      const result = await response.json();
      const errorFetch = await error;
      
      result.info.current = url;   
      setCharacters(result.results);
      setDataInfo(result.info);
      setError(null);
      setSelectedCharacter(characters[0]);
      setLoaded(true);
      setUrl(url);  
    
      
      /* .then(
        //call the json function and return a promise
        (response) => response.json())
      .then(
        (result)=> {
          console.log(result);
          if(result.error){
            setError(result.error);
            setLoaded(true)
          }
            //return
          //}
          const persons = result.results;
          const info = result.info;
          //add the current page address to the data
          info.current = url;
          setCharacters(persons);
          setDataInfo(info);
          console.log('characters', characters, persons, result)
          
          //create URL for search
          //setUrlSearch(urlBase+'1,'+info.count);
          setError(null);
          setSelectedCharacter(persons[0]);
          setLoaded(true);
          setUrl(url);  
        },
        //handle API errors here to separate them from other bugs
        (error) => {
          setLoaded(true)
          setError(error)
          }
      ) */
    //}
  }

  const searchHandler = (name) =>{
    let newUrl=urlBase+'?name='+name;
    apiFetch(newUrl);
  }
  
  
      
      //render a map of characters from the state
      //add selected boolean to clicked element
      //assign a click event to the div with an image

  const persons = (characters.map((character, key) => {
    return (
      <Character
        key={character.id}
        image={character.image}
        selected={selectedCharacter===character?true:false}
        clicked={() => setSelectedCharacter(character)}
        character={character}/> 
    )
    })); 
        
      return(
        <div>
          <div className="nav-top__search">
            <a role="button" aria-label="home" href='#' onClick={() => {setUrl(urlBase+'?page=1')}}><span className="home-icon" ></span></a>
            <Search searchHandler={() => searchHandler}/>
            {( !loaded )? (<p className="nav-top__error">Loading...</p>):<p> </p>}
          </div>
          {( error )? (<div className="nav-top__results">No results</div>):
            <div>
              {(loaded)?(<Navigation dataInfo={dataInfo} apiFetch={apiFetch}/>):null}
              <main id="main-content" className="content-main"> 
              {(characters&&loaded)?(<>
                <div id="character-container">
                  <section id="character-container-grid">
                    {persons}
                  </section> 
                </div>
                <div className="sidebar">
                  <div className="details">
                    {(loaded)?(<CharacterDetails 
                      character={selectedCharacter}/>):""}
                  </div> 
                    {/* <GenderGraph counts={this.genderCounter(characters)}/>  */} 
                    {(loaded)?(<GenderGraph 
                      characters={characters}/>):""} 
                </div></>):null}
              </main>
            </div>
        }
        </div>
      )
}
    

/* export default CharacterGridContainer; */
