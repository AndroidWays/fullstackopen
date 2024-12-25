import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { GET_BOOKS_BY_GENRE } from "../graphql/queries";

const Books = ({ show, selectedGenre }) => {
    const { loading, error, data } = useQuery(GET_BOOKS_BY_GENRE, {
        variables: { genre: selectedGenre },
    });

    if (!show) {
        return null;
    }

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Books</h2>
            <p>in genre patterns {selectedGenre}</p>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allBooks.map((book) => (
                        <tr key={book.id || `${book.title}-${book.published}`}>
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
