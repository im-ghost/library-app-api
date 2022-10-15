const mongoose=require('mongoose');
const UserModel = require('../models/user.js');
const { graphql } = require('graphql');
const schema =require('../schema.js');

 const teardown = async function () {
  await UserModel.deleteMany({name:"okoro"});
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

 const graphqlTestCall = async (
  query,
  variables
) => {
  return graphql({
    schema,
    query,
    variables,
  });
};
module.exports = {
  teardown,
  graphqlTestCall
}