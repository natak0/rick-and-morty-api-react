import React, { useState } from 'react';

const Search = (props) => {
  const [query, setQuery] = useState('');
  const [handler,setHandler]=useState(props.searchHandler)
  //console.log('search', props.searchHandler("rick"));

  return(
    <div>
      <input 
      type="text"
      onChange={e => setQuery(e.target.value)}>
    </input>
    <button onClick={() => handler(query)}>search</button>
    </div>
    

    
  )
}

export default Search;