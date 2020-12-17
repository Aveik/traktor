import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchRatings } from '../../user/ratings/ratings.slice';
import { isForLoggedUser } from '../../utils';

const postRating = createAsyncThunk('users/ratings/rate', async function (
  { entity, rating, slug },
  { rejectWithValue },
) {
  try {
    await axios.post('/trakt/sync/ratings', {
      [entity]: [
        {
          ids: { slug },
          rating,
        },
      ],
    });
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const removeRating = createAsyncThunk('users/ratings/remove', async function (
  { entity, slug },
  { rejectWithValue },
) {
  try {
    await axios.post('/trakt/sync/ratings/remove', {
      [entity]: [{ ids: { slug } }],
    });
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

function postRatingAndFetch(params) {
  return async function (dispatch) {
    await dispatch(postRating(params));
    await dispatch(fetchRatings());
  };
}

function removeRatingAndFetch(params) {
  return async function (dispatch) {
    await dispatch(removeRating(params));
    await dispatch(fetchRatings());
  };
}

const { reducer } = createSlice({
  extraReducers: {
    [fetchRatings.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg)) {
        return action.payload;
      }
      return state;
    },
  },
  initialState: [],
  name: 'users/ratings',
  reducers: {},
});

export { postRatingAndFetch, removeRatingAndFetch };
export default reducer;
