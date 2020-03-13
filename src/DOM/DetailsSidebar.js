import React from 'react';

const DetailsSidebar = (item) => {
	//console.log('details sidebar', item.image);
  return (
    <div className="sidebar">
      <p>Soy sidebar</p>
				<img 
					className="character-poster"
					id="character-poster"
          src={item.image}
          alt="character image">
      </img>
		</div>
	)
}

export default DetailsSidebar;