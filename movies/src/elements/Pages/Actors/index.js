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
        <Link onClick={openModal}>Adicione um Filme !</Link>
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
    </div>
  );
}

export default Actors;
