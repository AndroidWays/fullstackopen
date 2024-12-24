import { useState } from "react";
import PropTypes from "prop-types";

const Authors = (props) => {
    const [authors, setAuthors] = useState([
        { name: "J.K. Rowling", born: "1965", bookCount: 1 },
        { name: "George R.R. Martin", born: "1948", bookCount: 1 },
        { name: "J.R.R. Tolkien", born: "1892", bookCount: 1 },
    ]);

    // Return early if the component shouldn't be rendered
    if (!props.show) {
        return null;
    }

    const handleBornChange = (index, year) => {
        const updatedAuthors = [...authors];
        updatedAuthors[index].born = year; // Update the author's birth year
        setAuthors(updatedAuthors);
    };

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Born</th>
                        <th>Books</th>
                    </tr>
                    {authors.map((author, index) => (
                        <tr key={author.name}>
                            <td>{author.name}</td>
                            <td>
                                <input
                                    type="number"
                                    value={author.born}
                                    onChange={(e) => handleBornChange(index, e.target.value)}
                                    placeholder="Enter birth year"
                                />
                            </td>
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
