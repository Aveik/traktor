import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../../utils';
import { isForLoggedUser } from '../../utils';

const fetchRecommendations = createAsyncThunk(
  'users/recommendations/fetch',
  async function (userSlug = getUserSlug(), { rejectWithValue }) {
    try {
      const response = await axios.get(
        `/trakt/users/${userSlug}/recommendations?extended=full`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const { reducer } = createSlice({
  extraReducers: {
    [fetchRecommendations.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg)) {
        return state;
      }
      return action.payload;
    },
  },
  initialState: [],
  name: 'users/recommendations',
  reducers: {},
});

export { fetchRecommendations };
export default reducer;
