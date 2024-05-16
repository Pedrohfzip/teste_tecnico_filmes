import React from "react";
import "./style.css";
import CardActor from "../../CardActor";
function Actors() {
  return (
    <div className="actor">
      <div className="AllActors">
        <h1>Todos os Atores de A - Z</h1>
        <div className="firstMovies">
          <div className="cardActor">
            <CardActor />
          </div>
          <div className="cardActor">
            <CardActor />
          </div>
          <div className="cardActor">
            <CardActor />
          </div>
          <div className="cardActor">
            <CardActor />
          </div>
          <div className="cardActor">
            <CardActor />
          </div>
          <div className="cardActor">
            <CardActor />
          </div>
          <div className="cardActor">
            <CardActor />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Actors;
