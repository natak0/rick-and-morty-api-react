import React from 'react'
import DetailsSidebar from './DetailsSidebar'

const MainContent = () =>{
      
      return(
        <main id="main-content" className="content-main">            
              <div id="character-container">
                <section id="character-grid">
                </section>
            </div>
            <DetailsSidebar />
            </main>
      )
    }

export default MainContent