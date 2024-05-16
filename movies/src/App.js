import "./App.css";

import { Routes, Route } from "react-router-dom";
import Header from "./elements/Header";
import Home from "./elements/Pages/Home";
import Actors from "./elements/Pages/Actors";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actors" element={<Actors />} />
      </Routes>
    </div>
  );
}

export default App;
