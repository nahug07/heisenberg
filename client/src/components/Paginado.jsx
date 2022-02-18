import React from "react";

export default function Paginado({characterPerPage, allCharacters, paginado}) {
    const pageNumber = []

    for(let i=0; i<= Math.ceil(allCharacters/characterPerPage); i++){
        pageNumber.push(i+1)
    }

    return(
        <nav>
            <ul className="paginado">
                {pageNumber && pageNumber.map(number =>(
                    <li className="number" key={number}>
                        <p onClick={() => paginado(number)}>{number}</p>
                    </li>
                ))}
            </ul>
        </nav>
    )

}