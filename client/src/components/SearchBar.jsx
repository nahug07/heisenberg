import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../actions";

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
        <div>
            <input 
            type="text"
            placeholder="Buscar personaje.."
            onChange={(e) => HandleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}