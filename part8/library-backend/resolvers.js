/*
const bcrypt = require("bcryptjs");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
    Query: {
        allBooks: async (root, args) => {
            let books = await Book.find({}).populate("author", "name");
            if (args.author) {
                books = books.filter((book) => book.author.name === args.author);
            }
            if (args.genre) {
                books = books.filter((book) => book.genres.includes(args.genre));
            }
            return books;
        },

        allAuthors: async () => {
            return Author.find({});
        },

        me: (root, args, context) => {
            if (!context.currentUser) {
                throw new Error("Not authenticated");
            }
            return context.currentUser;
        },
    },

    Author: {
        bookCount: async (parent) => {
            // Count the number of books for the current author
            return Book.countDocuments({ author: parent._id });
        },
    },

    Mutation: {
        addAuthor: async (root, args) => {
            const author = new Author({ name: args.name, born: args.born || null });
            await author.save();
            return author;
        },

        addBook: async (root, args) => {
            const existingBook = await Book.findOne({ title: args.title });
            if (existingBook) {
                throw new Error("A book with this title already exists.");
            }

            const author = await Author.findOne({ name: args.author });
            if (!author) {
                throw new Error("Author not found");
            }

            const book = new Book({
                title: args.title,
                author: author._id,
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
                password: hashedPassword,
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
*/

const bcrypt = require("bcryptjs");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
    Query: {
        allBooks: async (root, args) => {
            let books = await Book.find({}).populate("author", "name");
            if (args.author) {
                books = books.filter((book) => book.author.name === args.author);
            }
            if (args.genre) {
                books = books.filter((book) => book.genres.includes(args.genre));
            }
            return books;
        },

        allAuthors: async () => {
            return Author.find({});
        },

        me: (root, args, context) => {
            if (!context.currentUser) {
                throw new Error("Not authenticated");
            }
            return context.currentUser;
        },
    },

    Author: {
        bookCount: async (parent) => {
            return Book.countDocuments({ author: parent._id });
        },
    },

    Mutation: {
        addAuthor: async (root, args) => {
            const author = new Author({ name: args.name, born: args.born || null });
            await author.save();
            return author;
        },

        addBook: async (root, args) => {
            const existingBook = await Book.findOne({ title: args.title });
            if (existingBook) {
                throw new Error("A book with this title already exists.");
            }

            const author = await Author.findOne({ name: args.author });
            if (!author) {
                throw new Error("Author not found");
            }

            const book = new Book({
                title: args.title,
                author: author._id,
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
                password: hashedPassword,
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
