import React from 'react'

export const Paginator = ({position,pages,next,prev,total,page,getData}) => {
    let totalPages = [];
    for (let i = 1; i <= pages; i++) {
        totalPages.push(i);
    }

    let urlPrev = prev && prev.replace(process.env.REACT_APP_API_URL_BASE, "");
    let urlNext = next && next.replace(process.env.REACT_APP_API_URL_BASE, "");

    const handlerPages = (e,endpoint)=> {
        e.preventDefault()
        getData(endpoint)
        console.log(urlNext);
        console.log(urlPrev);
    }

  return (
    <nav aria-label="Page navigation example">
        <ul className={`pagination ${position}`}>
          <li className={`page-item ${!prev && 'disabled'}`}>
            <a className="page-link" href="#" aria-label="Previous" onClick={(event) => handlerPages(event, urlPrev)}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          
          {
            totalPages.map(pag => (
                <li className={`page-item ${page == pag && 'active'}`}>
                <a className="page-link" href="#" onClick={(event) => handlerPages(event, `/products?page=${pag}`)}>
                    {pag}</a>
                </li>
            ))
          }

          <li className={`page-item ${!next && 'disabled'}`}>
            <a className="page-link" href="#" aria-label="Next" onClick={(event) => handlerPages(event, urlNext)}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
  )
}
