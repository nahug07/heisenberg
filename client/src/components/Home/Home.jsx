import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  filterCharactersByStatus,
  filterCreated,
  orderByName,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import stl from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);

  // --> Paginado <-- //
  const [currentPage, setCurrentPage] = useState(1); // guardo en un estado local la página actual y la seteo en 1
  const [charactersPerPage /* , setCharactersPerPage */] = useState(8); // guardo en un estado cuantos personajes quiero por página
  const indexOfLastCharacter = currentPage * charactersPerPage; //indice del último personaje (6)
  const indexOfFirstCharacters = indexOfLastCharacter - charactersPerPage; // indice del primer personaje (0)
  const currentCharacters = allCharacters.slice(
    indexOfFirstCharacters,
    indexOfLastCharacter
  ); //agarro el array de todos los personajes y lo recorto desde el 1er personaje hasta el 6to

  const paginado = (pageNumber) => {
    //seteo la página en ese número de página
    setCurrentPage(pageNumber);
  };
  //------------------------------------------------------//
  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
  }
  //-------------------------------------------------------//
  // --> Filtrado <-- //
  function handleFilterStatus(e) {
    dispatch(filterCharactersByStatus(e.target.value));
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  // --> Ordenamiento <-- //
  const [orden, setOrden] = useState("");
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={stl.conteinerMain}>
      <div className={stl.c2}>
        <div>
          <button className={stl.hpbot1}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Cargar todos los personajes
          </button>
        </div>
        <div>
          <Link to="/character"> <button className={stl.hpbot2}>Crear personaje</button></Link>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
            <select className={stl.hpfilter1} onChange={(e) => handleSort(e)}>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
        </div>
        <div>
            <select
              className={stl.hpfilter2}
              onChange={(e) => handleFilterStatus(e)}
            >
              <option value="All">Todos</option>
              <option value="Alive">Vivo</option>
              <option value="Deceased">Muerto</option>
              <option value="Unknown">Desconocido</option>
              <option value="Presumed dead">Probablemente muerto</option>
            </select>
        </div>
        <div>
            <select
              className={stl.hpfilter3}
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="All">Todos</option>
              <option value="created">Creados</option>
              <option value="api">Existente</option>
            </select>
        </div>
      </div>

          <div className={stl.c5}>
            {currentCharacters?.map((el) => {
              return (
                <div key={el.name}>
                  <Link to={"/home/" + el.id}>
                    <Card
                      name={el.name}
                      img={el.img}
                      nickname={el.nickname}
                      key={el.id}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        <div className={stl.c4}>
          <Paginado
            characterPerPage={charactersPerPage}
            allCharacters={allCharacters.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
      </div>
  );
}
