const {
  Schema,
  model
} = require ("mongoose")
const authorSchema = new Schema({
  //
  name:{
    type:String
  },
  //
  ownerId:{
    type:String
  },
  booksIds:{
    type:Array
  },
  DOB:{
    type:Date
},
  DOD:{
    type:Date
}
})
module.exports = model("Author", authorSchema)