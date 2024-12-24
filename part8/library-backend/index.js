/*
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
*/

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

mongoose
    .connect(
        "mongodb+srv://GeeksWay:Dreamsday@cluster0.7k1dgeu.mongodb.net/fullstackopenApp?retryWrites=true&w=majority&ssl=true&appName=Cluster0",
        {}
    )
    .then(() => {
        console.log("Connected to MongoDB");
        server.listen().then(({ url }) => {
            console.log(`Server ready at ${url}`);
        });
    })
    .catch((err) => {
        console.error("Connection error", err);
    });
