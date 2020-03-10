import React from 'react';
import DetailsSidebar from './DetailsSidebar';
import CharacterGridContainer from './CharacterGridContainer';

const MainContent = (resultsData) => {
    const results = resultsData.resultsData;     
      return (
        <main id="main-content" className="content-main">            
            <div id="character-container">
                <CharacterGridContainer resultsData={results} /> 
            </div>
            <DetailsSidebar />
            </main>
      )
    }

export default MainContent;