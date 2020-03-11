import React, { Component } from 'react';
import './App.css';
import Header from './DOM/Header';
import Pagination from './DOM/Pagination';
import MainContent from './DOM/MainContent';
import Footer from './DOM/Footer';

class App extends Component {
constructor(props) {
    //refer to the parent class constructor
    super(props);
    //use 'this' after parent call
    this.state = {
      error: null,
      isLoaded: false,
      info: [],
      results: []
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
    
  render() {
    const {error, isLoaded, info, results} = this.state;
    //console.log("STATE", results, isLoaded, error)
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
          <MainContent resultsData={results}/>
          <Footer />
        </div>
      )
    }
  }
}

export default App;
