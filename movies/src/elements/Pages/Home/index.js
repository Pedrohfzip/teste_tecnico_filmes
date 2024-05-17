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
      const title = document.getElementById("title").value;
      const release_year = document.getElementById("release_year").value;
      const available = document.getElementById("available").value;
      const movie = {
        title: title,
        release_year: release_year,
        available: available,
      };

      const response = await axios.post(`http://localhost:3000/movie`, {
        movie,
      });

      event.preventDefault();
      // console.log(response.data);
      return response; // Substitua localhost e a porta pela URL correta da sua API
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
        <Link className="btnCreate" onClick={openModal}>
          Adicione um Filme !
        </Link>
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
                <input type="text" id="title" name="title" />
              </div>
              <div>
                <label htmlFor="release_year">Ano de Lançamento:</label>
                <input type="number" id="release_year" name="release_year" />
              </div>
              <div>
                <label htmlFor="availability">Disponibilidade:</label>
                <select id="available" name="available">
                  <option value={true}>Disponível</option>
                  <option value={false}>Indisponível</option>
                </select>
              </div>
              <button className="btnForm" type="submit">
                Adicionar Filme
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

export default Home;
