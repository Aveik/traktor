import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Poster from '../../components/Poster/Poster.component';
import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/person/person.selectors';
import { fetchPerson } from '../../redux/modules/person/person.slice';

function Person() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'person/fetch'),
  );
  const person = useSelector(selectEntity);

  useEffect(() => {
    dispatch(fetchPerson(slug));
  }, [dispatch, slug]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <Poster
        entity='person'
        id={person.summary?.ids.tmdb}
        size='w185'
        type='profile'
      />
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </>
  );
}

export default Person;
