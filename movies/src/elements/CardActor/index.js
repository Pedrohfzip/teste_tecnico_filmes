import { Link } from "react-router-dom";
import "./style.css";
import React, { useState } from "react";

import axios from "axios";
function CardActor({ props }) {
  const birth = new Date(props.date_birth);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const remove = async (event) => {
    try {
      const idTemp = props.id;
      const id = Number(idTemp);
      console.log(id);
      const response = await axios.delete(`http://localhost:3000/actors/${id}`);

      event.preventDefault();
      // console.log(response.data);
      return response;
    } catch {}
  };

  const handleSubmit = async (event) => {
    try {
      const idTemp = props.id;
      const id = Number(idTemp);
      const name = document.getElementById("name").value;
      let date_birth = document.getElementById("date_birth").value;
      const nationality = document.getElementById("nationality").value;
      if (date_birth === "") {
        date_birth = new Date(props.date_birth);
      }
      const actor = {
        id: id,
        name: name,
        date_birth: date_birth,
        nationality: nationality,
      };

      console.log(actor);
      const response = await axios.put(`http://localhost:3000/actors/${id}`, {
        actor,
      });

      event.preventDefault();
      // console.log(response.data);
      return response; // Substitua localhost e a porta pela URL correta da sua API
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  return (
    <div className="cardActor">
      <div className=""></div>
      <div className="optionsActor">
        <ul className="infoActor">
          <li className="titleActor">{props.name}</li>
          <li className="titleActor">Nasceu em {props.date_birth}</li>

          <li>
            <Link onClick={openModal}>Ver Ator</Link>
          </li>
        </ul>
      </div>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <p>Digite nos campos se desejar editar</p>
              <div>
                <label htmlFor="title">Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={props.name}
                />
              </div>
              <div>
                <label htmlFor="date_birth">Data de Nascimento:</label>
                <input
                  type="date"
                  id="date_birth"
                  name="date_birth"
                  defaultValue={props.date_birth}
                />
              </div>
              <div>
                <label htmlFor="nationality">Nacionalidade:</label>
                <select
                  id="nationality"
                  name="nationality"
                  defaultValue={props.nationality}
                >
                  <option value="BR">BR</option>
                  <option value="EUA">EUA</option>
                  <option value="ACRE">ACRE</option>
                  <option value="CHINA">CHINA</option>
                </select>
              </div>
              <button type="submit">Editar</button>
              <button onClick={remove}>Excluir</button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardActor;
