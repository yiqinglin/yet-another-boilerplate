import { gql } from 'apollo-server-express';
import User from '~/models/user';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    addUser(username: String!): User
  }
`;

// Provide resolver functions for schema fields
const resolvers = {
  Query: {
    async users() {
      const users = await User.find().exec();
      
      return users
    }
  },
  Mutation: {
    async addUser(obj, args) {
      const { username } = args;
      const newUser = await User.create({username});

      return newUser;
    }
  }
};

export default {
  typeDefs,
  resolvers,
};
