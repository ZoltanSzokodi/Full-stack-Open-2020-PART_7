import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks/index';

const CreateNew = ({ addNew, handleNotification }) => {
  const history = useHistory();

  const content = useField('text', 'content');
  const author = useField('text', 'author');
  const info = useField('text', 'info');

  const handleSubmit = e => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    handleNotification(`Added "${content.value}"`);
    setTimeout(() => handleNotification(''), 5000);

    history.push('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>content</label>
          <input {...content.form} />
        </div>
        <div>
          <label>author</label>
          <input {...author.form} />
        </div>
        <div>
          <label>url</label>
          <input {...info.form} />
        </div>
        <button type='submit'>add new</button>
        <button type='button' onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
