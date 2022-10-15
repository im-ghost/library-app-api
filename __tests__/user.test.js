const { graphqlTestCall, teardown } = require('./helpers.js');
const UserModel = require('../models/user.js');
const {connectDB} = require('../config/db.js');
jest.setTimeout(100000)
beforeAll(async () => {
  // create a user
await connectDB();
  const user = {
    name: 'okoro',
    email: 'ada@mail.com',
    password: 'ada',
  };

  const testUser = new UserModel(user);
  await testUser.save();
});

afterAll(async () => {
  await teardown();
});


const addUser = `
  mutation addUser($name:String,$password:String,$email: String) {
    addUser(name:$name,password:$password,email:$email) {
      _id
      name,
      password,
      email
    }
  }
`;

const loginMutation = `
mutation LoginMutation($email: String, $password: String) {
  login(email: $email, password: $password) {
    token
  }
}
`;

const getUsersQuery = `
  query GetUsersQuery($token:String) {
    users(token:$token) {
      id
      token
    }
  }
`;

describe('User resolvers', () => {
  test('test getUsers', async () => {
    const response = await graphqlTestCall(getUsersQuery, {});
    console.log(response)
    expect(response.data?.users.length).toBe(1);
  });

});
