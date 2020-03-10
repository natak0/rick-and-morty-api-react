import React from 'react';

const Pagination = (infoData) => {
    //const next = infoData.infoData.next;
    return (
        <div className="pagination">
					<a id="home">home</a>
					<a className="prev-page">prev</a>
					<span>page </span>
					<span className="current-page">1</span>
					<a className="next-page">next</a>
        </div>)
  }

  export default Pagination;