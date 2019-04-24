import { gql } from 'apollo-server-express';

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
    users: () => [{_id: '123', username: 'John Doe'}]
  },
  Mutation: {
    addUser: (obj, args) => ({_id: '123', username: args.username})
  }
};

export default {
  typeDefs,
  resolvers,
};
