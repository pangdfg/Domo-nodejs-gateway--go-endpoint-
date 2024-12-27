const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const axios = require("axios");

require("dotenv").config();

const FIBER_API_URL = process.env.API || "http://go-app:3000/users";

// GraphQL type definitions
const typeDefs = `
  type User {
    id: ID
    name: String
  }

  input UserInput {
    name: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: async () => {
      try {
        const response = await axios.get(FIBER_API_URL);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
    },
    user: async (_, { id }) => {
      try {
        const response = await axios.get(`${FIBER_API_URL}/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch user with id ${id}: ${error.message}`);
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        console.log(input);
        const response = await axios.post(FIBER_API_URL, input);
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    updateUser: async (_, { id, input }) => {
      try {
        const response = await axios.put(`${FIBER_API_URL}/${id}`, input);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to update user with id ${id}: ${error.message}`);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await axios.delete(`${FIBER_API_URL}/${id}`);
        return "User deleted successfully";
      } catch (error) {
        throw new Error(`Failed to delete user with id ${id}: ${error.message}`);
      }
    },
  },
};

// Create an executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Express server
const app = express();
app.use(bodyParser.json()); // Middleware for parsing JSON
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL
  })
);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});
