import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, gql } from "@apollo/client";

const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`;

const NewBook = ({ show, addBook }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    const [addBookMutation] = useMutation(ADD_BOOK, {
        onError: (error) => {
            setError("Error adding book. Please try again.");
            console.error(error);
        },
        onCompleted: (data) => {
            addBook(data.addBook);
            setError(null);
        },
    });

    if (!show) return null;

    const submit = async (event) => {
        event.preventDefault();

        if (!title || !author || !published || genres.length === 0) {
            setError("Please fill in all fields, including at least one genre.");
            return;
        }

        try {
            await addBookMutation({
                variables: {
                    title,
                    author,
                    published: Number(published),
                    genres,
                },
            });

            setTitle("");
            setPublished("");
            setAuthor("");
            setGenres([]);
            setGenre("");
        } catch (error) {
            console.error("Error adding book:", error);
            setError("There was an error adding the book.");
        }
    };

    const addGenre = () => {
        const trimmedGenre = genre.trim();
        if (trimmedGenre && !genres.includes(trimmedGenre)) {
            setGenres([...genres, trimmedGenre]);
            setGenre("");
        }
    };

    return (
        <div>
            <h2>Add New Book</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        id="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="published">Published</label>
                    <input
                        id="published"
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                        placeholder="Add Genre"
                    />
                    <button type="button" onClick={addGenre}>
                        Add Genre
                    </button>
                </div>
                <div>Genres: {genres.join(", ")}</div>
                <button
                    type="submit"
                    disabled={!title || !author || !published || genres.length === 0}
                >
                    Create Book
                </button>
            </form>
        </div>
    );
};

NewBook.propTypes = {
    show: PropTypes.bool.isRequired,
    addBook: PropTypes.func.isRequired,
};

export default NewBook;
