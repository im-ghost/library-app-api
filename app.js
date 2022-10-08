const express = require('express');

const {
  graphqlHTTP
} = require("express-graphql");
const schema = require("./schema");
var {connectDB }= require("./config/db");
var cors = require("cors");

const path = require('path');
const app = express();
app.use(cors())
connectDB()

const root={
  isUser:()=>{}
}
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))
app.listen(5000, ()=> {
  console.log("Listening on port 5000")})
module.exports = app;