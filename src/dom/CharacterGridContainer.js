import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation/Navigation'
import Character from '../Components/Character/Character';
import CharacterDetails from '../Components/CharacterDetails/CharacterDetails';
import GenderGraph from '../Components/Graphs/GenderGraph';
import Search from '../Components/Search/Search';

export const CharacterGridContainer = () => { 
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [urlBase] = useState('https://rickandmortyapi.com/api/character/');
  const [url, setUrl] = useState(urlBase);
  const [dataInfo, setDataInfo] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState([]);

  useEffect(() => { apiFetch(url) }, [ url ]);

  async function apiFetch(url) {
    setLoaded(false);
    const response = await fetch(url)       
      .catch(err => {
        setError(true); 
      }); 
    console.log(response);
    if (response) {
      if(response.status >= 400 && response.status < 600) {
        setError(true);
      } else {
        const result = await response.json();
        result.info.current = url;   
        setCharacters(result.results);
        setDataInfo(result.info);
        setSelectedCharacter(result.results[0]);
        setError(null);
        setLoaded(true);
        setUrl(url);}
      }  
      setLoaded(true);
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
    <>
      <div className="nav-top__search">
        <a role="button" aria-label="home" onClick={() => {apiFetch(urlBase+'?page=1')}}><span className="home-icon" ></span></a>
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
                <CharacterDetails 
                  character={selectedCharacter}/>
              </div> 
                <GenderGraph 
                  characters={characters}/>
            </div></>):null}
          </main>
        </div>
    }
    </>
  )
}
