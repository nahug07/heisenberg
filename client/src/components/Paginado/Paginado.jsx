import React from "react";
import stl from "./Paginado.module.css"

export default function Paginado({characterPerPage, allCharacters, currentPage, paginado}) {
    const pageNumber = []

    for(let i=0; i<= Math.ceil(allCharacters/characterPerPage); i++){
        pageNumber.push(i+1)
    }

    return(
        <nav>
            <ul className={stl.paginado}>
                {pageNumber && pageNumber.map(number =>(
                    <li className={stl.number} key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
                 <span>{`   Página actual  ${currentPage}`}</span>
            </ul>
        </nav>
    )

}