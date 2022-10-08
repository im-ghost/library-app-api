const {
  Schema,
  model
} = require ("mongoose")
const genreSchema = new Schema({
  //
  name: {
    type: String
  },
  ownerId:{
    type: String
  },
  booksIds: {
    type: Array
  }
})
module.exports = model("Genre", genreSchema)