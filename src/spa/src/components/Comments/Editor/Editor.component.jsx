import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Editor({ comment = '', onSubmit, spoiler = false }) {
  const [state, setState] = useState({
    comment,
    spoiler,
  });

  function handleCommentChange({ target: { value } }) {
    setState({
      ...state,
      comment: value,
    });
  }

  function handleSpoilerChange({ target: { checked } }) {
    setState({
      ...state,
      spoiler: checked,
    });
  }

  function reset() {
    setState({
      comment,
      spoiler,
    });
  }

  function handleSubmit() {
    onSubmit({ comment: state.comment, reset, spoiler: state.spoiler });
  }

  return (
    <>
      <label htmlFor='comment'>Type your comment</label>
      <br />
      <textarea
        id='comment'
        onChange={handleCommentChange}
        value={state.comment}
      />
      <br />
      <input
        checked={state.spoiler}
        id='spoiler'
        onChange={handleSpoilerChange}
        type='checkbox'
      />
      <label htmlFor='spoiler'>Is this spoiler?</label>
      <br />
      <button onClick={handleSubmit} type='button'>
        Submit
      </button>
    </>
  );
}

Editor.propTypes = {
  comment: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  spoiler: PropTypes.bool,
};

export default Editor;
