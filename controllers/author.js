var Author = require("../models/author");
const authors = async() =>{
  const all = await Author.find({});
  if(all){
    return all
  }
  return null
}

const singleAuthor = async(id)=>{
  const author = await Author.findById(id);
  if(author){
    return author
  }
  return null
}

module.exports = {
  authors,
  singleAuthor
}