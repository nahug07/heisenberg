import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";

export default function Detail(props) {
    const dispatch = useDispatch()
    const {id} = useParams()   
    const myCharacter = useSelector((state) => state.detail)
    
    useEffect(() => {
        dispatch(getDetail(id)) //asi acceso al id de ese detalle
    }, [id, dispatch])

    

    return (
        <div>
            {
                myCharacter.length > 0 ?
                <div>
                    <h1>Soy {myCharacter[0].name}</h1>
                    <img src={myCharacter[0].img} alt="imagen no encontrada" height="200px" width="200px" />
                    <h2>Estado: {myCharacter[0].status}</h2>
                    <p>Cumpleaños: {myCharacter[0].birthday}</p>
                    <h5>Ocupaciones: {/* !myCharacter[0].createdInDb ? */ myCharacter[0].occupation + ' ' /* : myCharacter[0].occupations.map(el => el.name + (' ')) */}</h5>
                </div> :
                <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}