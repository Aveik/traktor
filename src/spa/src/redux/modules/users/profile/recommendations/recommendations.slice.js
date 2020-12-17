import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchRecommendations } from '../../user/recommendations/recommendations.slice';
import { isForLoggedUser } from '../../utils';

const postRecommendation = createAsyncThunk(
  'users/recommendations/recommend',
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
  'users/recommendations/unrecommend',
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

function postRecommendationAndRefetch(params) {
  return async function (dispatch) {
    await dispatch(postRecommendation(params));
    await dispatch(fetchRecommendations());
  };
}

function removeRecommendationAndRefetch(params) {
  return async function (dispatch) {
    await dispatch(removeRecommendation(params));
    await dispatch(fetchRecommendations());
  };
}

const { reducer } = createSlice({
  extraReducers: {
    [fetchRecommendations.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg)) {
        return action.payload;
      }
      return state;
    },
  },
  initialState: [],
  name: 'users/recommendations',
  reducers: {},
});

export { postRecommendationAndRefetch, removeRecommendationAndRefetch };
export default reducer;
