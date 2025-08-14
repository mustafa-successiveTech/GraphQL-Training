import { ApolloServer } from '@apollo/server.js';

export const createApolloServer = (schema) => {
  return new ApolloServer({
    schema,
    introspection: true,
  });
};