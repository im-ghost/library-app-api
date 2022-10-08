const {
  Schema,
  model
} = require ("mongoose")
const bookSchema = new Schema({
  //
  name: {
    type: String
  },
  authorId: {
    type: String
  },
  genreId: {
    type: String
  },
  DOB: {
    type: Date
  },
  content: {
    type: String
  }
})
module.exports = model("Book", bookSchema)