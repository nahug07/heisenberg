import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOccupation, postCharacter } from "../../actions"; 
import { useDispatch, useSelector } from "react-redux";
import slt from "./CharacterCreate.module.css"


export default function CharacterCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const occupation = useSelector((state) => state.occupation)

    const [input, setInput] = useState({
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        img:"",
        occupation: []
    })
    useEffect((c) => {
        dispatch(getOccupation())
    }, [dispatch])

    function handleChange (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input);
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            occupation: [...input.occupation, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postCharacter(input));
        alert("Personaje creado!!");
        setInput({
            name: " ",
            nickname: '',
            birthday: '',
            status: '',
            img:'',
            occupation: []
        })
        navigate('/home')
    }

    return(
        <div>
            
            <h1>Crear personaje</h1>
            <form className={slt.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Nickname</label>
                    <input
                        type="text"
                        value={input.nickname}
                        name="nickname"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Cumpleaños</label>
                    <input
                        type="text"
                        value={input.birthday}
                        name="birthday"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Imagen</label>
                    <input
                        type="text"
                        value={input.img}
                        name="img"
                        onChange={(e) => handleChange(e)}
                    />  
                </div>
                <div>
          <label>Estado</label>
          <label>
          <input type="checkbox" value="Alive" name="Alive" onChange={(e) => handleCheck(e)} />
          Vivo</label>
          <label>
          <input type="checkbox" value="Deceased" name="Deceased" onChange={(e) => handleCheck(e)} />
          Muerto</label>
          <label>
          <input type="checkbox" value="Unknown" name="Unknown" onChange={(e) => handleCheck(e)} />
          Desconocido</label>
          <label>
          <input type="checkbox" value="Presumed dead" name="Presumed dead" onChange={(e) => handleCheck(e)} />
          Presuntamente Muerto</label>
        </div>
                <select onChange={(e) => handleSelect(e)}>
                    {
                        occupation.map((occ) =>(
                            <option value={occ.name}> { occ.name} </option>
                        ))
                    }
                </select>
                <ul><li>{ input.occupation.map(el => el + ",") }</li></ul>
                <button type='submit'>Crear personaje</button>            
            </form>
            <Link to='/home'><button>Volver</button></Link>
        </div>
    )
}






/* import React from "react";
import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postCharacter, getOccupations } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

//Validación del form
function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un Nombre'
    }
    else if (!input.nickname){
        errors.nickname = 'Nickname debe ser completado';
    }
    return errors;
};


export default function CharacterCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const occupations = useSelector((state) => state.occupations); // me traigo las ocupaciones
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    occupation: [],
  });

  //manejo el cambio de los imputs
  function handleChange(e){   //cada vez que se ejecute esta funcion a mi estado input además de lo que tenia, agregale
    setInput({               //el target.value de lo que este modificando
        ...input,  //traigo todo lo que ya tenia
        [e.target.name] : e.target.value   //seteo mi value por el name con el value
    })
    setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
    }));
    console.log(input)
  }

  //manejo de checkboxs
  function handleCheck(e){     //si el input esta marcado, agarro el estado y lo seteo
      if(e.target.checked){
          setInput({
              ...input,
              status: e.target.value
          })
      }
  }

  function handleSelect(e){
      setInput({
          ...input,  //guardo en un arreglo todas las occupations que vaya seleccionando
          occupation: [...input.occupation, e.target.value] 
      })
  }

  function handleSubmit(e){
      e.prevent.default();
      dispatch(postCharacter(input))
      alert('Personaje creado con éxito!')
      setInput({
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        occupation: [],
      })
      navigate('/home'); // <---- Me lleva al home una vez creado el personaje
  }
  
  function handleDelete(el){
      setInput({
          ...input,
          occupation: input.occupation.filter( occ => occ !== el)
      })
  }

  useEffect((c) => {
    dispatch(getOccupations());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Creá tu personaje</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />{ errors.name && (
              <p className="error">{errors.name}</p>
          )}
        </div>
        <div>
          <label>Nickname:</label>
          <input type="text" value={input.nickname} name="nickname" onChange={(e) => handleChange(e)}/>{ errors.nickname && (
              <p className="error">{errors.nickname}</p>
          )}
        </div>
        <div>
          <label>Cumpleaños:</label>
          <input type="text" value={input.birthday} name="birthday" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>Imagen:</label>
          <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Estado:</label>
          <label>
          <input type="checkbox" value="Alive" name="Alive" onChange={(e) => handleCheck(e)} />
          Vivo</label>
          <label>
          <input type="checkbox" value="Deceased" name="Deceased" onChange={(e) => handleCheck(e)} />
          Muerto</label>
          <label>
          <input type="checkbox" value="Unknown" name="Unknown" onChange={(e) => handleCheck(e)} />
          Desconocido</label>
          <label>
          <input type="checkbox" value="Presumed dead" name="Presumed dead" onChange={(e) => handleCheck(e)} />
          Presuntamente Muerto</label>
        </div>
        <select onChange={(e) => handleSelect(e)}>
            {occupations.map((occ) =>(
                <option value={occ.name} key={occ.id}>{occ.name}</option>
            ))}
        </select>
        <br />
        <button type="submit">Crear Personaje</button>

      </form>
     <div>
     {input.occupation.map(el => 
            <div className="divOcc" key={el.id}>
                <p key={el.id}>{el}</p>
                <button className="botonX" onClick={() => handleDelete(el)}>x</button>
            </div>)}
     </div>
        
    </div>
  );
} */
