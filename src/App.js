import React, { Component } from 'react';
import {ReactDOM} from 'react'
import './App.css';

/* const CreateCharacterContainer = () => {
  const results = this.state.results;
  return (
    results.map(item => (
      <div class="character-grid" key={item.id} data-name={item.name} data-species={item.species} data-location={item.location.name} data-gender={item.gender}>
        <img className="character-poster" src={item.image} alt="character image"></img>{item.name}
      </div>
    ))
    )
} */
// create simple components for the DOM elements: 
// header, pagination, main container with characters and details sidebar, and footer
const CreateHeader = () => {
  return (<header id="main-header" className="header-main">
    <nav id="main-nav">
                <a className="logo">The Rick and Morty Characters</a>
            </nav>
  </header>)
}

const CreatePagination = (infoData) => {
  //const next = infoData.infoData.next;
  return (
    <div className="pagination">
        <a id="home">home</a>
        <a className="prev-page">prev</a>
        <span>page </span><span className="current-page">1</span>
        <a  className="next-page">next</a>
  </div>)
}
const CreateDetailsSidebar = () => {
  return (
    <div className="sidebar">
      <p>Soy sidebar</p>
    </div>
  )
}
const CreateFooter = () => {
  return <footer id="nav-footer"></footer>
}
const CreateMainContent = () =>{
  
/*   const {error, isLoaded, info, results} = this.state;
  console.log("STATE", results, isLoaded, error) */
  
  return(
    <main id="main-content" className="content-main">
          
          <div id="character-container">
          <section id="character-grid">
         
          
          </section>
        </div>
        <CreateDetailsSidebar />
        </main>
  )
}
const CreateCharacterContainer =(resultsData)=>{

    //const {error, isLoaded, info, results} = this.state;
 
  console.log("resultsData", resultsData);
  return (<div>{ resultsData.resultsData.map(item => (
    <div className="character-grid" id={item.id} key={item.id} data-name={item.name} data-species={item.species} data-location={item.location.name} data-gender={item.gender}>
      <img className="character-poster" src={item.image} alt="character image"></img>{item.name}
    </div>
  )) } </div>)

    /* ReactDOM.render(
      document.getElementById('1'),
      document.getElementById('root')
    ); */
  } 




class App extends Component{
  constructor(props){
    //refer to the parent class constructor
    super(props);
    console.log(props);
    //use this after parent call
    this.state = {
      error:null,
      isLoaded:false,
      info:[],
      results:[]
    }
  }

  //load data from api immediately after a component is mounted/inserted into the tree 
  componentDidMount() {
    const apiURL = "https://rickandmortyapi.com/api/character/?page=1";
    fetch(apiURL)
    .then(response => response.json())
    .then((result) => {
      console.log("RM INFO",result.info);
      return result
    })
    .then(
      //update the state
      (result) => {
        this.setState({
          isLoaded:true,
          info:result.info,
          results:result.results
        });
        console.log("setstate", result)
      },
      //handle API errors here to separate them from bugs in
      (error) => {
        this.setState({
          isLoaded:true,
          error
        });
      })
    }
    


  render(){
    const {error, isLoaded, info, results} = this.state;
    //console.log("STATE", results, isLoaded, error)
    if (error) {
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded){
      return <div>Loading...</div>;
    }
    else {
      return (
        <div className="site-wrapper">
          <CreateHeader />
          <CreatePagination infoData={info}/>
          <CreateMainContent />
{/*           {results.map(item => (
            <div className="character-grid" key={item.id} data-name={item.name} data-species={item.species} data-location={item.location.name} data-gender={item.gender}>
              <img className="character-poster" src={item.image} alt="character image"></img>{item.name}
            </div>
          ))} */}
           <CreateCharacterContainer resultsData={results} />  
         
          <CreateFooter />

        </div>
        
      )
    }
  }
  //React.renderComponent(<p>rendertest</p>, document.getElementById('character-grid'))
}

export default App;
