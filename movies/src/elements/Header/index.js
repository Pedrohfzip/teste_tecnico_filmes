import { Link } from "react-router-dom";
import "./style.css";
function Header() {
  return (
    <div className="Header">
      <div className="container">
        <div className="logo">
          <h1>WikiMovies</h1>
        </div>
        <div className="nav">
          <ul>
            <li>
              <Link to="/">Filmes</Link>
              <Link to="/actors">Atores</Link>
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Header;
