import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar os dados do formulário para o backend para edição
    // Exemplo: axios.put('/api/movies/' + props.id, formData)
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
                <label htmlFor="releaseYear">Ano de Lançamento:</label>
                <input
                  type="number"
                  id="releaseYear"
                  name="releaseYear"
                  defaultValue={props.release_year}
                />
              </div>
              <div>
                <label htmlFor="availability">Disponibilidade:</label>
                <select
                  id="availability"
                  name="availability"
                  defaultValue={props.available ? "Disponível" : "Indisponível"}
                >
                  <option value="True">Disponível</option>
                  <option value="False">Indisponível</option>
                </select>
              </div>
              <button type="submit">Editar</button>
              <button type="submit">Excluir</button>
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

export default CardMovie;
