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
