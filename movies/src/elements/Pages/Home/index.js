import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import CardMovie from "../../CardMovie";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleSubmit = async (event) => {
    try {
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setMovies(response.data);
        console.log(response.data);
        return response.data; // Substitua localhost e a porta pela URL correta da sua API
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  console.log(movies);
  return (
    <div className="home">
      <div className="AllMoviesAZTitle">
        <h1>Todos os Filmes de A - Z</h1>
        <Link onClis>Adicione um Filme !</Link>
        <div className="firstMovies">
          {movies.map((movie) => {
            return (
              <div className="cardMovies">
                <CardMovie props={movie} />
              </div>
            );
          })}
        </div>
      </div>
      ,
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <button type="submit">Editar</button>
              <button>Excluir</button>
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

export default Home;
