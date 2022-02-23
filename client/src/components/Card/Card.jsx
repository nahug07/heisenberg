import React from "react";
import stl from "./Card.module.css";

export default function Card({ name, img, nickname }) {
  return (
    <div className={stl.conteinerCard}>
      <div className={stl.card}>
        <img src={img} alt="img not found" />
        <div className={stl.content}>
          <div className={stl.contentBx}>
            <h3>{name}</h3>
            <br />
            <h5>{nickname}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
