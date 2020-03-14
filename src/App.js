import React, { Component } from 'react';
import './App.css';
import Header from './dom/Header';
import Footer from './dom/Footer';
import CharacterGridContainer from './dom/CharacterGridContainer';
import GenderGraph from './Components/Graphs/GenderGraph';

class App extends Component {
  render() {
    return (
      <div className="site-wrapper">
        <Header />
        <CharacterGridContainer />
        <Footer />
      </div>
    )
  }
}

export default App;
