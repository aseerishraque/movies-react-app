import React, { Component } from 'react';
import _ from 'lodash';
class Pagination extends Component {
    state = {  }
    render() { 
        const {total, pageCount, activePage, setActivePage} = this.props;
        const totalPages = Math.ceil(total/pageCount);
        const pages = _.range(1, totalPages+1, 1);
        return ( 
            <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li onClick={() => activePage-1 >= 1 ? setActivePage(activePage-1) : null}
                         className="page-item"><a className="page-link" href="#2">Previous</a></li>
                    {
                        pages.map(page=>{
                            return <li key={page} onClick={()=>setActivePage(page)} style={{cursor:'pointer'}} className={activePage===page ? "page-item active" : "page-item"}><a className="page-link">{page}</a></li>
                        })
                    }
                    
                    <li onClick={() => activePage <= totalPages-1 ? setActivePage(activePage+1) : null}
                        className="page-item">
                            <a className="page-link"
                                style={{cursor:'pointer'}}
                                href="#1">
                            Next
                        </a></li>
                </ul>
            </nav>
            </>
         );
    }
}
 
export default Pagination;