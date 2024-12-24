/*
const { gql } = require("apollo-server");

const typeDefs = gql`
    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int
    }

    type Book {
        id: ID!
        title: String!
        author: Author!
        published: Int
        genres: [String]!
    }

    type Query {
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author]
    }

    type Mutation {
        addAuthor(name: String!, born: Int): Author
        addBook(title: String!, author: String!, published: Int, genres: [String]): Book
        editAuthor(name: String!, setBornTo: Int): Author
    }
`;

module.exports = typeDefs;
*/

const { gql } = require("apollo-server");

const typeDefs = gql`
    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int
    }

    type Book {
        id: ID!
        title: String!
        author: Author!
        published: Int
        genres: [String]!
    }

    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Token {
        value: String!
    }

    type Query {
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author]
        me: User
    }

    type Mutation {
        addAuthor(name: String!, born: Int): Author
        addBook(title: String!, author: String!, published: Int, genres: [String]): Book
        editAuthor(name: String!, setBornTo: Int): Author
        createUser(username: String!, email: String!, password: String!): User
        login(username: String!, password: String!): Token
    }
`;

module.exports = typeDefs;
