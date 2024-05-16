function authCreateMovie({ movie }) {
  if (movie.title == " " || movie.title == null) {
    console.log("Titulo Vazio");
    return false;
  }
}

module.exports = {
  authCreateMovie,
};
