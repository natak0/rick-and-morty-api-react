import React from 'react';

const CharacterGridContainer = (resultsData) => {
	return (
    <section id = 'character-grid'> {
      resultsData.resultsData.map(item => (
        <div 
					className="character-grid"
					id={item.id}
					key={item.id}
					data-name={item.name}
					data-species={item.species}
					data-location={item.location.name}
					data-gender={item.gender}>
					<img className="character-poster"
						src={item.image}
						alt="character image">
					</img>
					{item.name}
        </div>
			)) 
    } 
		</section>
	)
} 

export default CharacterGridContainer;