import { gql } from "@apollo/client";

// Fragment for common book fields
const BOOK_FIELDS = gql`
    fragment BookFields on Book {
        title
        author {
            name
        }
        published
        genres
    }
`;

export const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            ...BookFields
        }
    }
    ${BOOK_FIELDS}
`;
