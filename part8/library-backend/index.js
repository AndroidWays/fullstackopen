require("dotenv").config(); // Load environment variables from .env file

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Add user authentication logic here
        return { currentUser: null }; // Example context setup
    },
});

// Get the MongoDB URI from the environment variable
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error("MongoDB URI is not defined in the environment variables.");
    process.exit(1); // Exit the process if the URI is not found
}

mongoose
    .connect(mongoURI, {})
    .then(() => {
        console.log("Connected to MongoDB");
        server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
            console.log(`Server ready at ${url}`);
        });
    })
    .catch((err) => {
        console.error("Connection error", err);
    });
