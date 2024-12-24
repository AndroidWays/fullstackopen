import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import "./App.css";

const App = () => {
    const [page, setPage] = useState("authors");
    const [books, setBooks] = useState([
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J.K. Rowling",
            published: 1997,
        },
        { title: "A Game of Thrones", author: "George R.R. Martin", published: 1996 },
        { title: "The Hobbit", author: "J.R.R. Tolkien", published: 1937 },
    ]);
    const [authors, setAuthors] = useState([
        { name: "J.K. Rowling", born: 1965, bookCount: 7 },
        { name: "George R.R. Martin", born: 1948, bookCount: 5 },
        { name: "J.R.R. Tolkien", born: 1892, bookCount: 3 },
    ]);

    const addBook = (newBook) => {
        // Update books state when a new book is added
        setBooks(books.concat(newBook));

        // Optionally, update authors' book count
        setAuthors(
            authors.map((author) => {
                if (author.name === newBook.author) {
                    return { ...author, bookCount: author.bookCount + 1 };
                }
                return author;
            })
        );
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                <button onClick={() => setPage("add")}>add book</button>
            </div>

            <Authors show={page === "authors"} authors={authors} />
            <Books show={page === "books"} books={books} />
            <NewBook show={page === "add"} addBook={addBook} />
        </div>
    );
};

export default App;
