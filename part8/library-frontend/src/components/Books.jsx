import { useState } from "react";
import PropTypes from "prop-types";

const Books = (props) => {
    const [books] = useState([
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J.K. Rowling",
            published: 1997,
        },
        { title: "A Game of Thrones", author: "George R.R. Martin", published: 1996 },
        { title: "The Hobbit", author: "J.R.R. Tolkien", published: 1937 },
    ]);

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>Books</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {books.map((book) => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
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
