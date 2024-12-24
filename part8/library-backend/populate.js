const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

const authors = [
    { name: "Manasseh Azure Awuni", born: 1985 },
    { name: "Robert Martin", born: 1952 },
    { name: "Martin Fowler", born: 1962 },
    { name: "Fyodor Dostoevsky", born: 1821 },
    { name: "Joshua Kerievsky", born: 1964 },
    { name: "Sandi Metz", born: 1960 },
    { name: "Kent Beck", born: 1961 },
    { name: "Don Norman", born: 1935 },
    { name: "Erich Gamma", born: 1955 },
    { name: "Andrew Hunt", born: 1960 },
];

const books = [
    {
        title: "The Fourth John: Reign, Rejection & Rebound",
        author: "Manasseh Azure Awuni",
        published: 2019,
        genres: ["Politics and Vigilantism", "Investigative Journalism"],
    },
    {
        title: "The President Ghana Never Got",
        author: "Manasseh Azure Awuni",
        published: 2024,
        genres: ["Politics and Vigilantism", "Investigative Journalism"],
    },
    {
        title: "Clean Code",
        author: "Robert Martin",
        published: 2008,
        genres: ["programming", "refactoring"],
    },
    {
        title: "Agile software development",
        author: "Robert Martin",
        published: 2002,
        genres: ["programming", "agile"],
    },
    {
        title: "Refactoring",
        author: "Martin Fowler",
        published: 1999,
        genres: ["programming", "refactoring"],
    },
    {
        title: "Design Patterns",
        author: "Erich Gamma",
        published: 1994,
        genres: ["programming", "design patterns"],
    },
    {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        published: 1999,
        genres: ["programming", "software development"],
    },
    {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        published: 1988,
        genres: ["design", "usability"],
    },
    {
        title: "NoSQL Distilled",
        author: "Martin Fowler",
        published: 2012,
        genres: ["database", "nosql"],
    },
];

async function populateDatabase() {
    try {
        // Connect to the database
        await mongoose.connect(
            "mongodb+srv://Zampu:Dreamsday@cluster0.vkfbi.mongodb.net/Library-App?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("Connected to MongoDB");

        // Insert authors only if they don't already exist
        for (let authorData of authors) {
            const existingAuthor = await Author.findOne({ name: authorData.name });
            if (!existingAuthor) {
                const author = new Author(authorData);
                await author.save();
                console.log(`Author '${authorData.name}' inserted`);
            }
        }

        // Insert books and associate with existing authors
        for (let bookData of books) {
            const author = await Author.findOne({ name: bookData.author });
            if (!author) {
                console.log(`Author not found for book: '${bookData.title}'`);
                continue;
            }

            const existingBook = await Book.findOne({ title: bookData.title });
            if (!existingBook) {
                const book = new Book({
                    title: bookData.title,
                    author: author._id,
                    published: bookData.published,
                    genres: bookData.genres,
                });
                await book.save();
                console.log(`Book '${bookData.title}' inserted`);
            }
        }

        console.log("Database populated successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error populating database:", error);
    }
}

populateDatabase();
