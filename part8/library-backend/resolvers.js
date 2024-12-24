/*
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
*/

const bcrypt = require("bcryptjs");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
    Query: {
        allBooks: async (root, args) => {
            let books = await Book.find({}).populate("author", "name"); // Populate 'name' of the author
            if (args.author) {
                books = books.filter((book) => book.author.name === args.author);
            }
            if (args.genre) {
                books = books.filter((book) => book.genres.includes(args.genre));
            }
            return books;
        },

        allAuthors: async () => {
            const authors = await Author.find({});
            return authors.filter((author) => author.name !== null); // Ensure 'name' is not null
        },

        me: (root, args, context) => {
            if (!context.currentUser) {
                throw new Error("Not authenticated");
            }
            return context.currentUser;
        },
    },

    Mutation: {
        addAuthor: async (root, args) => {
            const author = new Author({ name: args.name, born: args.born || null });
            await author.save();
            return author;
        },

        addBook: async (root, args) => {
            // Check if the book already exists by title
            const existingBook = await Book.findOne({ title: args.title });
            if (existingBook) {
                throw new Error("A book with this title already exists.");
            }

            // Find the author by name
            const author = await Author.findOne({ name: args.author });
            if (!author) {
                throw new Error("Author not found");
            }

            // Create and save the new book
            const book = new Book({
                title: args.title,
                author: author._id, // Reference to the author's _id
                published: args.published,
                genres: args.genres,
            });

            await book.save();
            return book;
        },

        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name });
            if (!author) {
                throw new Error("Author not found");
            }
            author.born = args.setBornTo;
            await author.save();
            return author;
        },

        createUser: async (root, args) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);

            const user = new User({
                username: args.username,
                email: args.email,
                password: hashedPassword, // Store hashed password
            });

            await user.save();
            return user;
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user) {
                throw new Error("Invalid username or password");
            }

            const passwordMatch = await bcrypt.compare(args.password, user.password);
            if (!passwordMatch) {
                throw new Error("Invalid username or password");
            }

            return { value: "some-jwt-token" }; // Replace with actual JWT token generation logic
        },
    },
};

module.exports = resolvers;
