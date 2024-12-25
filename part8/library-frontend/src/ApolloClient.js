import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"; // Import GraphQLWsLink from @apollo/client/link/subscriptions
import { createClient } from "graphql-ws"; // Import createClient from graphql-ws

// Set up the WebSocket client using the graphql-ws protocol
const wsClient = createClient({
    url: "ws://localhost:4000/graphql", // Your WebSocket URL (ensure the server is listening at this endpoint)
});

// Set up the GraphQLWsLink using the client
const wsLink = new GraphQLWsLink(wsClient);

// Set up the HTTP link for queries and mutations (fallback)
const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql", // Your HTTP endpoint
});

import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

// Split links based on operation type
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink, // Use WebSocket link for subscriptions
    httpLink // Use HTTP link for other queries and mutations
);

// Initialize the Apollo Client with the split link
const client = new ApolloClient({
    link: splitLink, // Use splitLink to choose between WebSocket and HTTP links
    cache: new InMemoryCache(),
});

// Queries and mutations as before

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`;

// Your other GraphQL queries and mutations go here...

export default client;
