import React from 'react';
import { useParams } from 'react-router';

function Comments({ type }) {
  const { slug } = useParams();
  return (
    <div>
      Type: {type} - showing comments for {slug}
    </div>
  );
}

export default Comments;
