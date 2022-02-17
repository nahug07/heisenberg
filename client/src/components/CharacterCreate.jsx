import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postCharacter, getOccupations } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const occupations = useSelector((state) => state.occupations); // me traigo las ocupaciones

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
  

  useEffect(() => {
    dispatch(getOccupations());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Creá tu personaje</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="">Nombre:</label>
          <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label htmlFor="">Nickname:</label>
          <input type="text" value={input.nickname} name="nickname" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label htmlFor="">Cumpleaños:</label>
          <input type="text" value={input.birthday} name="birthday" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label htmlFor="">Imagen:</label>
          <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label htmlFor="">Estado:</label>
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
                <option value={occ.name}>{occ.name}</option>
            ))}
        </select>
        <ul>
            <li>{input.occupation.map(el => el + ", ")}</li> {/* lista que muestra lo que se va seleccionando */}
        </ul>
        <button type="submit">Crear Personaje</button>
      </form>
    </div>
  );
}
