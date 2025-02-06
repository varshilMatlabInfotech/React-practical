import React from 'react';
import './Pagination.css'


const Pagination = ({ postsPerPage, length }) => {

  const paginationNumbers = [];



  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {

    paginationNumbers.push(i);

  }



  return (

    <div className='pagination'>

      {paginationNumbers.map((pageNumber) => (

        <button key={pageNumber}>{pageNumber}</button>

      ))}

    </div>

  );

};



export default Pagination;