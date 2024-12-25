// src/index.js or src/index.jsx
import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient"; // Import Apollo Client configuration

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            {" "}
            {/* Wrap your app with ApolloProvider */}
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
