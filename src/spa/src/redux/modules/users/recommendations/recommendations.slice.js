import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../utils';

const fetchRecommendations = createAsyncThunk(
  'users/recommendations/fetch',
  async function (userSlug = getUserSlug(), { rejectWithValue }) {
    try {
      const response = await axios.get(
        `/trakt/users/${userSlug}/recommendations`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const postRecommendation = createAsyncThunk(
  'users/recommendation/recommend',
  async function ({ entity, slug }, { rejectWithValue }) {
    try {
      await axios.post('/trakt/sync/recommendations', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const removeRecommendation = createAsyncThunk(
  'users/recommendation/unrecommend',
  async function ({ entity, slug }, { rejectWithValue }) {
    try {
      await axios.post('/trakt/sync/recommendations/remove', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

function postRecommendationAndRefetch(args) {
  return async function (dispatch) {
    await dispatch(postRecommendation(args));
    await dispatch(fetchRecommendations());
  };
}

function removeRecommendationAndRefetch(args) {
  return async function (dispatch) {
    await dispatch(removeRecommendation(args));
    await dispatch(fetchRecommendations());
  };
}

const { reducer } = createSlice({
  extraReducers: {
    [fetchRecommendations.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: [],
  name: 'users/recommendations',
  reducers: {},
});

export {
  fetchRecommendations,
  postRecommendationAndRefetch,
  removeRecommendationAndRefetch,
};
export default reducer;
