import React from "react";
import "./style.css";
import CardMovie from "../../CardMovie";
function Home() {
  return (
    <div className="home">
      <div className="AllMoviesAZTitle">
        <h1>Todos os Filmes de A - Z</h1>
        <div className="firstMovies">
          <div className="cardMovie">
            <CardMovie />
          </div>
          <div className="cardMovie">
            <CardMovie />
          </div>
          <div className="cardMovie">
            <CardMovie />
          </div>
          <div className="cardMovie">
            <CardMovie />
          </div>
          <div className="cardMovie">
            <CardMovie />
          </div>
        </div>
      </div>
      <div className="AllActors">
        <h1>Todos os Atores de A - Z</h1>
      </div>
    </div>
  );
}

export default Home;
