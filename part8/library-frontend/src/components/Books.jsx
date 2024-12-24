import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { GET_BOOKS } from "../graphql/queries";

const Books = (props) => {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (!props.show) {
        return null;
    }

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error.message}</p>;

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
                    {data.allBooks.map((book) => (
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
