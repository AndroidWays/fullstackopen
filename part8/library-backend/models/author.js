// models/author.js
/*
let authors = [
    { id: 1, name: "Manasseh Azure Awuni", born: 1985 },
    { id: 2, name: "Manasseh Azure Awuni", born: 1985 },
    { id: 3, name: "Robert Martin", born: 1952 },
    { id: 4, name: "Martin Fowler", born: 1962 },
    { id: 5, name: "Fyodor Dostoevsky", born: 1821 },
    { id: 6, name: "Joshua Kerievsky", born: 1964 },
    { id: 7, name: "Sandi Metz", born: 1960 },
    { id: 8, name: "Kent Beck", born: 1961 },
    { id: 9, name: "Don Norman", born: 1935 },
];

module.exports = authors;
*/

const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name must be present
    },
    born: Number,
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
