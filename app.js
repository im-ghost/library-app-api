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

app.use(express.static(path.join(__dirname, 'public')));

app.use("/favicon.ico",(req,res,next)=>{
  return "./favicon.png"
})
app.use("/",(req,res,next)=>{
  res.send("Home page")
})
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))
const port = process.env.PORT || 5000
app.listen(port, ()=> {
  console.log("Listening on port 5000")})
module.exports = app;