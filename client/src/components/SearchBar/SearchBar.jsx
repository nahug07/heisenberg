import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../../actions";
import stl from "./SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('') // estado local

    //guardo lo que esta tipeando el usuario en mi estado local 'name'

    function HandleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCharacters(name))
    }


    return (
        <div className={stl.searchBox}>
            <input className={stl.sbinput}
            type="text"
            placeholder="Buscar personaje.."
            onChange={(e) => HandleInputChange(e)}
            />
            <button className={stl.sbbot} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}