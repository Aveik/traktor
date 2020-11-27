import PropTypes from 'prop-types';
import React from 'react';

function Pagination({
  disabled,
  hasNextPage,
  hasPreviousPage,
  onFirstPage,
  onLastPage,
  onNextPage,
  onPreviousPage,
}) {
  return (
    <div>
      <button disabled={disabled} onClick={onFirstPage} type='button'>
        First page
      </button>
      <button
        disabled={disabled || !hasPreviousPage}
        onClick={onPreviousPage}
        type='button'
      >
        Previous page
      </button>
      <button
        disabled={disabled || !hasNextPage}
        onClick={onNextPage}
        type='button'
      >
        Next page
      </button>
      <button disabled={disabled} onClick={onLastPage} type='button'>
        Last page
      </button>
    </div>
  );
}

Pagination.propTypes = {
  disabled: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  hasPreviousPage: PropTypes.bool.isRequired,
  onFirstPage: PropTypes.func.isRequired,
  onLastPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
};

export default Pagination;
