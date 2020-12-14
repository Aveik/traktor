import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ListItemManager from '../../components/buttons/ListItemManager/ListItemManager.component';
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
      <ListItemManager entity='people' slug={slug} />
      <Poster
        entity='people'
        size='w185'
        tmdbId={person.summary?.ids.tmdb}
        type='profile'
      >
        {(url) => <img alt='poster' src={url} />}
      </Poster>
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </>
  );
}

export default Person;
