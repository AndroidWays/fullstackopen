import { useState } from "react";
import PropTypes from "prop-types";

const NewBook = (props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    if (!props.show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault();

        try {
            const newBook = {
                title,
                author,
                published: Number(published),
                genres,
            };

            // Add the new book to the state via the addBook function passed from App
            props.addBook(newBook);

            // Reset form fields
            setTitle("");
            setPublished("");
            setAuthor("");
            setGenres([]);
            setGenre("");
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error adding book:", error);
            setError("There was an error adding the book.");
        }
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    return (
        <div>
            <h2>Add New Book</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={submit}>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    <label>Author</label>
                    <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    <label>Published</label>
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input value={genre} onChange={({ target }) => setGenre(target.value)} />
                    <button type="button" onClick={addGenre}>
                        Add Genre
                    </button>
                </div>
                <div>Genres: {genres.join(" ")}</div>
                <button type="submit">Create Book</button>
            </form>
        </div>
    );
};
NewBook.propTypes = {
    show: PropTypes.bool.isRequired,
    addBook: PropTypes.func.isRequired,
};

export default NewBook;
