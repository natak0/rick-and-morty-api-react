import React, { Component } from 'react';
import './App.css';
import Header from './DOM/Header';
import Pagination from './DOM/Pagination';
import Footer from './DOM/Footer';
import DetailsSidebar from './DOM/DetailsSidebar';
import CharacterGridContainer from './DOM/CharacterGridContainer';

class App extends Component {
  constructor(props) {
      //refer to the parent class constructor
      super(props);
      this.updateSidebar=this.updateSidebar.bind(this);
      //use 'this' after parent call
      this.state = {
        error: null,
        isLoaded: false,
        info: [],
        results: [],
        sidebar: []
      }
    }

  //load data from api immediately after a component is mounted/inserted into the tree 
  componentDidMount() {
    const apiURL = "https://rickandmortyapi.com/api/character/?page=2";
    fetch(apiURL)
      .then(
        response => response.json())
      .then(
        (result) => {
          console.log("RM INFO", result.info);
          return result
        }
      )
      .then(
        //update the state
        (result) => {
          this.setState({
            isLoaded: true,
            info: result.info,
            results: result.results
          });
          console.log("setstate", result)
        },
        //handle API errors here to separate them from other bugs
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }
    
   updateSidebar = (x,y) => {
    console.log("clicked")
    return;
  }
  render() {
    const {error, isLoaded, info, results} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div className="site-wrapper">
          {/*  add components for the DOM */}
          <Header />
          <Pagination infoData={info}/>
          <main id="main-content" className="content-main">            
            <div id="character-container">
              <CharacterGridContainer 
                resultsData={results} 
                updateFunction={this.updateSidebar} /> 
            </div>
            <DetailsSidebar item={results[0]}/>
          </main>
          {/* <MainContent resultsData={results}/> */}
          <Footer />
        </div>
      )
    }
  }
}

/* //display the details of the clicked image
const displayDetailsHandler = (index, item) => {
  //const {sidebar} = this.state;
  
  
  this.setState({
    sidebar:item});
    console.log('display something', index, this.state)
  return (
    //document.querySelector('#character-poster').src=imageUrl
    <DetailsSidebar imageUrl={item}/>
  )     
} */

export default App;
