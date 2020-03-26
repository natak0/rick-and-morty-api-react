import React from 'react'

const Navigation = ({dataInfo, apiFetch}) => {
  if (dataInfo){

    const currentPageNumber = (url, pages) => {
      if(!url){
        return "0";
      }
      //get the number of the current page from the api address
      let pageNum = url.match(/[0-9]+/g); 
      if (pageNum === null) {
        pageNum = 1;
      }
      return ' page '+ pageNum+'/'+pages;
    }

    const previousPage= () =>{
      if(dataInfo && dataInfo.prev){
      apiFetch(dataInfo.prev)
      }
    }
    
    const nextPage= () =>{
      if(dataInfo && dataInfo.next){
      apiFetch(dataInfo.next)
      }
    }

    return (
      <div className="nav-top__pagination">
        <button 
          disabled={!dataInfo.prev} 
          onClick={() =>previousPage()}>prev</button>
        <span className="current-page">{currentPageNumber(dataInfo.current, dataInfo.pages)}</span>
        <button 
          disabled={!dataInfo.next}
          onClick={() => nextPage()}>next</button>
      </div>
    )
  }
}

export default Navigation;