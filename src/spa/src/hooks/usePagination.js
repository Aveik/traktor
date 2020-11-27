import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function usePagination(pagesTotalSelector) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page = '1', ...otherSearchProps } = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams],
  );
  const pagesTotal = useSelector(pagesTotalSelector);

  function toFirstPage() {
    setSearchParams({
      page: 1,
      ...otherSearchProps,
    });
  }

  function toLastPage() {
    setSearchParams({
      page: pagesTotal,
      ...otherSearchProps,
    });
  }

  function toNextPage() {
    setSearchParams({
      page: parseInt(page) + 1,
      ...otherSearchProps,
    });
  }

  function toPreviousPage() {
    setSearchParams({
      page: parseInt(page) - 1,
      ...otherSearchProps,
    });
  }

  return {
    hasNextPage: parseInt(page) < pagesTotal,
    hasPreviousPage: parseInt(page) > 1,
    page,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  };
}

export default usePagination;
