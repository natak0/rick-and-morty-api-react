import React, { useState } from 'react';

const Search = (props) => {
  const [query, setQuery] = useState('');
  const [handler]=useState(props.searchHandler);
  const icon = 
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 26 28" 
      aria-hidden="true" 
      class="icon-search">
        <path d="M18 13c0-3.859-3.141-7-7-7s-7 3.141-7 7 3.141 7 7 7 7-3.141 7-7zm8 13c0 1.094-.906 2-2 2a1.96 1.96 0 0 1-1.406-.594l-5.359-5.344a10.971 10.971 0 0 1-6.234 1.937c-6.078 0-11-4.922-11-11s4.922-11 11-11 11 4.922 11 11c0 2.219-.672 4.406-1.937 6.234l5.359 5.359c.359.359.578.875.578 1.406z">
        </path>
    </svg>

  return(
    <div className="nav-top-form-search" role="search" >
      <input 
        type="search"
        className="input-field-search"
        id="api-search"
        name="q"
        aria-label="Search through characters"
        placeholder="search for character"
        required
        onChange={e => setQuery(e.target.value)}>
      </input>
      <button 
        className="button-search" 
        onClick={() => handler(query)}>
          {icon}
        </button>
    </div>
  )
}

export default Search;