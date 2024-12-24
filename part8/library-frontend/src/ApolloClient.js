// src/ApolloClient.js

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Set up the HTTP link to your GraphQL server
const httpLink = new HttpLink({
    uri: "http://localhost:4000", // Replace with the backend URL
});

// Create ApolloClient instance
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(), // Cache configuration for the app's queries
});

export default client;
