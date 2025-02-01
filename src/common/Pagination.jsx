import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function Paginate({ 
    postsPerPage,
    totalPosts,
    setCurrentPage,
    currentPage,
 }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber, e) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    return (
        <div className="d-flex justify-content-end me-4 my-4">
            <Pagination>
                {pageNumbers.map((el) => {
                    return <Pagination.Item key={el} active={currentPage === el} onClick={(e) => paginate(el, e)}>
                        {el}
                    </Pagination.Item>
                })}

            </Pagination>
        </div>
    );
}

export default Paginate;