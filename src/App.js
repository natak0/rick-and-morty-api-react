import React, { Component } from 'react';
import './App.css';
import Header from './dom/Header';
import Pagination from './dom/Pagination';
import Footer from './dom/Footer';
import CharacterGridContainer from './dom/CharacterGridContainer';

class App extends Component {
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
}

export default App;
