/*
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

                {}
                {!isLoggedIn && <button onClick={() => setShowLoginForm(true)}>Login</button>}

                {}
                {isLoggedIn && <button onClick={() => setPage("add")}>add book</button>}
            </div>

            {}
            {showLoginForm && !isLoggedIn && (
                <LoginForm show={showLoginForm} onLogin={handleLogin} />
            )}

            {}
            <Authors show={page === "authors"} authors={authors} />
            <Books show={page === "books"} books={books} />

            {}
            {isLoggedIn && <NewBook show={page === "add"} addBook={addBook} />}
        </div>
    );
};

export default App;
*/

import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import "./App.css";

const App = () => {
    const [page, setPage] = useState("authors");
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [favoriteGenres, setFavoriteGenres] = useState([]); // Track favorite genres
    const [showRecommendations, setShowRecommendations] = useState(false); // Track Recommendations display

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
        if (username === "user" && password === "password") {
            setIsLoggedIn(true);
            setShowLoginForm(false);
        } else {
            throw new Error("Invalid username or password");
        }
    };

    const handleGenreSelection = (genre) => {
        setFavoriteGenres((prevGenres) =>
            prevGenres.includes(genre)
                ? prevGenres.filter((g) => g !== genre)
                : [...prevGenres, genre]
        );
    };

    const handleRecommendClick = () => {
        setShowRecommendations(!showRecommendations);
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>Authors</button>
                <button onClick={() => setPage("books")}>Books</button>

                {!isLoggedIn && <button onClick={() => setShowLoginForm(true)}>Login</button>}
                {isLoggedIn && <button onClick={() => setPage("add")}>Add Book</button>}
                {isLoggedIn && (
                    <button onClick={handleRecommendClick}>
                        {showRecommendations ? "Hide Recommendations" : "Recommend"}
                    </button>
                )}
                {isLoggedIn && <button onClick={() => setIsLoggedIn(false)}>Logout</button>}
            </div>

            {showLoginForm && !isLoggedIn && (
                <LoginForm show={showLoginForm} onLogin={handleLogin} />
            )}

            <Authors show={page === "authors"} authors={authors} />
            <Books show={page === "books"} books={books} />

            {isLoggedIn && <NewBook show={page === "add"} addBook={addBook} />}

            {showRecommendations && isLoggedIn && favoriteGenres.length > 0 && (
                <div>
                    <h2>Recommendations</h2>
                    <div>
                        {favoriteGenres.map((genre) => (
                            <button key={genre} onClick={() => handleGenreSelection(genre)}>
                                {genre}
                            </button>
                        ))}
                    </div>
                    <Books
                        show={true}
                        books={books.filter((book) =>
                            book.genres.some((genre) => favoriteGenres.includes(genre))
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
