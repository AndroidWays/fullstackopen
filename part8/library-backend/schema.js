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
