import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Post({ onSubmit }) {
  const [text, setText] = useState('');
  const [spoiler, setSpoiler] = useState(false);

  function handleTextChange({ target: { value } }) {
    setText(value);
  }

  function handleSpoilerChange({ target: { checked } }) {
    setSpoiler(checked);
  }

  function reset() {
    setText('');
    setSpoiler(false);
  }

  function handleSubmit() {
    onSubmit({ comment: text, done: reset, spoiler });
  }

  return (
    <>
      <h3>Post a new comment</h3>
      <label htmlFor='comment'>Type your comment</label>
      <br />
      <textarea id='comment' onChange={handleTextChange} value={text} />
      <br />
      <input
        checked={spoiler}
        id='spoiler'
        onChange={handleSpoilerChange}
        type='checkbox'
      />
      <label htmlFor='spoiler'>Is this spoiler?</label>
      <br />
      <button onClick={handleSubmit} type='button'>
        Post comment
      </button>
    </>
  );
}

Post.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Post;
