import React, { Component } from 'react';
import './App.css';
import Header from './dom/Header';
import Pagination from './dom/Pagination';
import Footer from './dom/Footer';
import CharacterGridContainer from './dom/CharacterGridContainer';
//import Character from './Components/Character/Character';

class App extends Component {
/*   constructor(props) {
      //refer to the parent class constructor
      super(props);
      //this.updateSidebar=this.updateSidebar.bind(this);
      //use 'this' after parent call
      this.state = {
        error: null,
        isLoaded: false,
        info: [],
        results: [],
        sidebar: [],
        clicked: ''
      }
    }

  //load data from api immediately after a component is mounted/inserted into the tree 
  componentDidMount() {
    const apiURL = "https://rickandmortyapi.com/api/character/?page=2";
    fetch(apiURL)
      .then(
        response => response.json())
      .then(
        //update the state
        (result) => {
          this.setState({
            isLoaded: true,
            info: result.info,
            results: result.results
          });
          //console.log("setstate", result)
        },
        //handle API errors here to separate them from other bugs
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  } */
    


  render() {
    return (
      <div className="site-wrapper">
        <Header />
        <Pagination />
        <CharacterGridContainer />
        <Footer />
      </div>
    )
  }
    /* const {error, isLoaded, info, results} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div className="site-wrapper">
          <Header />
          <Pagination infoData={info}/>
          <main id="main-content" className="content-main">            
            <div id="character-container">
              <CharacterGridContainer 
                resultsData={ results} 
                /> 
            </div>
            <Character />
          </main>
          <Footer />
        </div>
      )
    }
  } */
}

export default App;
