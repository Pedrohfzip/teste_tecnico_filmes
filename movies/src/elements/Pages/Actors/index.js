import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import CardActor from "../../CardActor";
function Actors() {
  const [actors, setactors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleSubmit = async (event) => {
    try {
      const name = document.getElementById("name").value;
      let date_birthTemp = document.getElementById("date_birth").value;
      const nationality = document.getElementById("nationality").value;
      const date_birth = new Date(date_birthTemp);
      const actor = {
        name: name,
        date_birth: date_birth,
        nationality: nationality,
      };

      console.log(actor);
      const response = await axios.post(`http://localhost:3000/actors`, {
        actor,
      });

      event.preventDefault();
      // console.log(response.data);
      return response; // Substitua localhost e a porta pela URL correta da sua API
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    const fetchactors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/actors");
        setactors(response.data);
        console.log(response.data);
        return response.data; // Substitua localhost e a porta pela URL correta da sua API
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchactors();
  }, []);

  return (
    <div className="actor">
      <div className="AllActors">
        <h1>Todos os Atores de A - Z</h1>
        <Link className="btnCreate" onClick={openModal}>
          Adicione um Ator !
        </Link>
        <div className="firstactors">
          {actors.map((actor) => {
            return (
              <div className="cardactors">
                <CardActor props={actor} />
              </div>
            );
          })}
        </div>
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
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
              </div>
              <div>
                <label htmlFor="date_birth">Data de nascimento</label>
                <input type="date" id="date_birth" name="date_birth" />
              </div>
              <div>
                <label htmlFor="nationality">nationality:</label>
                <select id="nationality" name="nationality">
                  <option value="BR">BR</option>
                  <option value="EUA">EUA</option>
                  <option value="ACRE">ACRE</option>
                  <option value="CHINA">CHINA</option>
                </select>
              </div>
              <button type="submit">Criar</button>
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

export default Actors;
