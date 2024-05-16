import { Link } from "react-router-dom";
import "./style.css";
function CardActor() {
  return (
    <div className="cardActor">
      <div className=""></div>
      <div className="optionsActor">
        <ul className="infoActor">
          <li className="titleActor">Nome</li>
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

export default CardActor;
