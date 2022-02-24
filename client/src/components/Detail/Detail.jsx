import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index";
import { useEffect } from "react";
import stl from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const myCharacter = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id)); //asi acceso al id de ese detalle
  }, [id, dispatch]);

  return (
    <div className={stl.conteinerDetail}>
       
      {myCharacter.length > 0 ? (
          
        <div className={stl.cardDetail}>
         
          <img
            src={myCharacter[0].img}
            className={stl.imgDetail}
            alt="imagen no encontrada"
            height="200px"
            width="200px"
          />
          <div className={stl.contentDetail}>
            <div className={stl.contentBxDetail}>
              <h1>{myCharacter[0].name}</h1>
              <h2>Estado: {myCharacter[0].status}</h2>
              <p>Cumpleaños: {myCharacter[0].birthday}</p>
              <h5>
                Ocupaciones:{" "}
                {
                  /* !myCharacter[0].createdInDb ?   */ myCharacter[0]
                    .occupation +
                    " " /*  : myCharacter[0].occupation.map(el => el.name + (' '))  */
                }
              </h5>
        
            </div>
         
          </div>
          
        </div>
        
      ) : (
        <h1 className={stl.loading}>Loading...</h1>
      )}
         <Link to="/home">
        <button className={stl.btnVolver}>Volver</button>
      </Link>
    </div>
  );
}
