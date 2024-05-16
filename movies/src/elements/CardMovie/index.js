import { Link } from "react-router-dom";
import "./style.css";
function CardMovie() {
  return (
    <div className="cardMovie">
      <div className=""></div>
      <div className="infoMovie">
        <ul className="infoMovielista">
          <li className="title">Nome</li>
          <li>Data lançamento</li>
          <li>Disponivel</li>
          <li>
            <Link to="/movie/:id">Visualizar Filme</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CardMovie;
