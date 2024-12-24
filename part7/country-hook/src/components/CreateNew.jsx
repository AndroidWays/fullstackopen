// src/components/CreateNew.jsx
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';

const CreateNew = ({ addNew }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    content.reset();
    author.reset();
    info.reset();
    navigate('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  // Destructure props to exclude reset
  const { reset: _, ...contentProps } = content;
  const { reset: __, ...authorProps } = author;
  const { reset: ___, ...infoProps } = info;

  return (
    <div>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...contentProps} />
        </div>
        <div>
          Author
          <input {...authorProps} />
        </div>
        <div>
          URL for More Info
          <input {...infoProps} />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
