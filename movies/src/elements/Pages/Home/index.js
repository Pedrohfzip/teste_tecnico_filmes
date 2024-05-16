import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import CardMovie from "../../CardMovie";
import axios from "axios";
function Home() {
  const [movies, setMovies] = useState([]);

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
        <div className="firstMovies">
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="cardMovies">
                <CardMovie props={movie} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
