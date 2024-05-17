function authCreateActor({ actor }) {
  if (
    actor.name == " " ||
    actor.date_birth == " " ||
    actor.nationality == " "
  ) {
    console.log("Sem dados");
    return false;
  }
}

module.exports = {
  authCreateActor,
};
