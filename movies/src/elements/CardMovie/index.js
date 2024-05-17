import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

function CardMovie({ props }) {
  console.log("Chegou no card movie");

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
      const response = await axios.delete(`http://localhost:3000/movie/${id}`);

      event.preventDefault();
      // console.log(response.data);
      return response;
    } catch {}
  };

  const handleSubmit = async (event) => {
    try {
      const idTemp = props.id;
      const id = Number(idTemp);
      const title = document.getElementById("title").value;
      const release_year = document.getElementById("release_year").value;
      const available = document.getElementById("available").value;
      const movie = {
        id: id,
        title: title,
        release_year: release_year,
        available: available,
      };

      console.log(id);
      const response = await axios.put(`http://localhost:3000/movie/${id}`, {
        movie,
      });

      event.preventDefault();
      // console.log(response.data);
      return response; // Substitua localhost e a porta pela URL correta da sua API
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  return (
    <div className="cardMovie">
      <div> </div>
      <div className="infoMovie">
        <ul className="infoMovielista">
          <li key={props.title} className="title">
            {props.title}
          </li>
          <li>{props.release_year}</li>
          <li>{props.available ? "Disponivel" : "Indisponivel"}</li>
        </ul>
        <ul className="infoMovielista">
          <li>
            <Link className="btnVerMais" onClick={openModal}>
              Ver mais
            </Link>
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
                <label htmlFor="title">Título:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={props.title}
                />
              </div>
              <div>
                <label htmlFor="release_year">Ano de Lançamento:</label>
                <input
                  type="number"
                  id="release_year"
                  name="release_year"
                  defaultValue={props.release_year}
                />
              </div>
              <div>
                <label htmlFor="availability">Disponibilidade:</label>
                <select
                  id="available"
                  name="available"
                  defaultValue={props.available ? "Disponível" : "Indisponível"}
                >
                  <option value={true}>Disponível</option>
                  <option value={false}>Indisponível</option>
                </select>
              </div>
              <button className="btnForm" type="submit">
                Editar
              </button>
              <button className="btnForm" onClick={remove}>
                Excluir
              </button>
              <button className="btnForm" type="button" onClick={closeModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardMovie;
