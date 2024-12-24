import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { GET_AUTHORS } from "../graphql/queries";

const Authors = (props) => {
    const { loading, error, data } = useQuery(GET_AUTHORS);

    if (!props.show) {
        return null;
    }

    if (loading) return <p>Loading authors...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

    if (!data || data.allAuthors.length === 0) {
        return <p>No authors found.</p>;
    }

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Born</th>
                        <th>Books</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allAuthors.map((author, index) => (
                        <tr key={author._id || index}>
                            <td>{author.name}</td>
                            <td>{author.born || "Unknown"}</td>
                            <td>{author.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Authors.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default Authors;
