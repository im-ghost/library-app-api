var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");

const books = async() => {
  const all = await Book.find({});
  if (all) {
    return all
  }
  return null
}

const singleBook = async(id)=> {
  const book = await Book.findById(id);
  if (book) {
    return book
  }
  return null
}
const delBook = async ()=> {}
const createBook = async (args)=> {

  let book = new Book({
    name: args.name,
    genreId: args.genreId,
    authorId: args.authorId,
    content: args.content,
    DOB: new Date()


  })

  let genre = await Genre.findById(book.genreId)
  genre.booksIds.push(book._id)
  let author = await Author.findById(book.authorId)
  author.booksIds.push(book._id)
  const update1 = {
    booksIds: genre.booksIds
  }
  const filter1 = {
    _id: args.genreId
  }
  let doc = await Genre.findOneAndUpdate(filter1, update1, {
    returnOriginal: false,
    new: true
  });
  const update = {
    booksIds: author.booksIds
  }
  const filter = {
    _id: args.authorId
  }
  let doct = await Author.findOneAndUpdate(filter, update, {
    returnOriginal: false,
    new: true
  });

  return book.save()
}
module.exports = {
  books,
  singleBook,
  createBook,
  delBook
}