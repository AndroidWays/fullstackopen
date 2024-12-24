const { v4: uuidv4 } = require("uuid"); // For generating unique ids

let authors = [
    { id: "1", name: "Manasseh Azure Awuni", born: 1985, bookCount: 2 },
    { id: "2", name: "Robert Martin", born: 1952, bookCount: 2 },
    { id: "3", name: "Martin Fowler", born: 1963, bookCount: 1 },
    { id: "4", name: "Fyodor Dostoevsky", born: 1821, bookCount: 2 },
    { id: "5", name: "Joshua Kerievsky", born: 1960, bookCount: 1 },
    { id: "6", name: "Sandi Metz", born: 1950, bookCount: 1 },
];

const resolvers = {
    Query: {
        allBooks: (root, args) => {
            let filteredBooks = books;
            if (args.author) {
                filteredBooks = filteredBooks.filter((book) => book.author === args.author);
            }
            if (args.genre) {
                filteredBooks = filteredBooks.filter((book) => book.genres.includes(args.genre));
            }
            return filteredBooks;
        },
        allAuthors: () => authors,
    },
    Mutation: {
        addAuthor: (root, args) => {
            const existingAuthor = authors.find((author) => author.name === args.name);
            if (existingAuthor) {
                return existingAuthor; // Author already exists
            }

            const newAuthor = {
                id: uuidv4(), // Generate a new unique ID
                name: args.name,
                born: args.born || null,
                bookCount: 0, // Initially no books
            };
            authors.push(newAuthor);
            return newAuthor;
        },
        addBook: (root, args) => {
            const existingAuthor = authors.find((author) => author.name === args.author);
            if (!existingAuthor) {
                // If the author doesn't exist, create a new one
                const newAuthor = {
                    id: uuidv4(),
                    name: args.author,
                    born: null,
                    bookCount: 0,
                };
                authors.push(newAuthor);
            }

            const newBook = {
                id: uuidv4(),
                title: args.title,
                author: args.author,
                published: args.published,
                genres: args.genres,
            };
            books.push(newBook);

            // Update book count for the author
            const author = authors.find((author) => author.name === args.author);
            author.bookCount++;

            return newBook;
        },
        editAuthor: (root, args) => {
            const author = authors.find((author) => author.name === args.name);
            if (!author) {
                return null;
            }
            author.born = args.setBornTo;
            return author;
        },
    },
};

module.exports = resolvers;
