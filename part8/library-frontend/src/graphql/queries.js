import { gql } from "@apollo/client";

// Fragment for common author fields
const AUTHOR_FIELDS = gql`
    fragment AuthorFields on Author {
        name
        born
        bookCount
    }
`;

// Fragment for common book fields
const BOOK_FIELDS = gql`
    fragment BookFields on Book {
        title
        author {
            name
        }
        published
    }
`;

export const GET_BOOKS = gql`
    query GetBooks {
        allBooks {
            ...BookFields
        }
    }
    ${BOOK_FIELDS}
`;

export const GET_AUTHORS = gql`
    query GetAuthors {
        allAuthors {
            ...AuthorFields
        }
    }
    ${AUTHOR_FIELDS}
`;
