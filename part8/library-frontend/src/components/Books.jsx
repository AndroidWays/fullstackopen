/*

import { useQuery } from "@apollo/client";
import { useState } from "react"; // Import useState from React
import PropTypes from "prop-types";
import { GET_BOOKS } from "../graphql/queries";

const Books = (props) => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [selectedGenre, setSelectedGenre] = useState(""); // State for selected genre

    if (!props.show) {
        return null;
    }

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Filter books based on selected genre
    const filteredBooks = selectedGenre
        ? data.allBooks.filter((book) => book.genres.includes(selectedGenre))
        : data.allBooks;

    // Get unique genres from all books for genre buttons, filter out empty values
    const allGenres = [...new Set(data.allBooks.flatMap((book) => book.genres))].filter(
        (genre) => genre
    ); // Ensure no empty or undefined genres

    return (
        <div>
            <h2>Books</h2>
            <p>in genre patterns</p>

            {}
            <div>
                {allGenres.map((genre, index) => (
                    <button key={index} onClick={() => setSelectedGenre(genre)}>
                        {genre}
                    </button>
                ))}
                <button onClick={() => setSelectedGenre("")}>All</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book._id || book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Books.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default Books;
*/

import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { GET_BOOKS } from "../graphql/queries";

const Books = ({ show, selectedGenre }) => {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (!show) {
        return null;
    }

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredBooks = selectedGenre
        ? data.allBooks.filter((book) => book.genres.includes(selectedGenre))
        : data.allBooks;

    return (
        <div>
            <h2>Books</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book._id || book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Books.propTypes = {
    show: PropTypes.bool.isRequired,
    selectedGenre: PropTypes.string,
};

export default Books;
