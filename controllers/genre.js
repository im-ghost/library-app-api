var Genre = require("../models/genre");
const genres = async() => {
  const all = await Genre.find({});
  if (all) {
    return all
  }
  return null
}

const singleGenre = async(id)=> {
  const genre = await Genre.findById(id);
  if (genre) {
    return genre
  }
  return null
}

module.exports = {
  genres,
  singleGenre
}