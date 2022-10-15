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

app.use("/", graphqlHTTP({
  schema,
  pretty:true,
  graphiql: true
}))
module.exports = app;