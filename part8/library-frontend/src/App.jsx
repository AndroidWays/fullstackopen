import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm"; // Import LoginForm
import "./App.css";

const App = () => {
    const [page, setPage] = useState("authors");
    const [books, setBooks] = useState([]); // Remove predefined books list
    const [authors, setAuthors] = useState([]); // Remove predefined authors list
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [showLoginForm, setShowLoginForm] = useState(false); // Track if the login form is shown

    const addBook = (newBook) => {
        setBooks(books.concat(newBook));
        setAuthors(
            authors.map((author) => {
                if (author.name === newBook.author) {
                    return { ...author, bookCount: author.bookCount + 1 };
                }
                return author;
            })
        );
    };

    const handleLogin = (username, password) => {
        // Dummy login logic, replace with actual authentication
        if (username === "user" && password === "password") {
            setIsLoggedIn(true);
            setShowLoginForm(false); // Hide login form after successful login
        } else {
            throw new Error("Invalid username or password");
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>

                {/* Show login button if not logged in */}
                {!isLoggedIn && <button onClick={() => setShowLoginForm(true)}>Login</button>}

                {/* Show "add book" only if logged in */}
                {isLoggedIn && <button onClick={() => setPage("add")}>add book</button>}
            </div>

            {/* Show the login form only if 'showLoginForm' is true */}
            {showLoginForm && !isLoggedIn && (
                <LoginForm show={showLoginForm} onLogin={handleLogin} />
            )}

            {/* Show Authors and Books sections always */}
            <Authors show={page === "authors"} authors={authors} />
            <Books show={page === "books"} books={books} />

            {/* Show Add Book form after login */}
            {isLoggedIn && <NewBook show={page === "add"} addBook={addBook} />}
        </div>
    );
};

export default App;
