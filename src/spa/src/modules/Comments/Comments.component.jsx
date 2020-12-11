import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router';

//@TODO: Add redux module for this component
function Comments({ entity }) {
  const { slug } = useParams();
  return (
    <div>
      Entity: {entity} - showing comments for {slug}
    </div>
  );
}

Comments.propTypes = {
  entity: PropTypes.oneOf(['movies', 'shows']),
};

export default Comments;
