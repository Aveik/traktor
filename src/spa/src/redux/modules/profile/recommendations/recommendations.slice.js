import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchRecommendations = createAsyncThunk(
  'profile/recommendations/fetch',
  async function (type, { rejectWithValue }) {
    try {
      const response = await axios.get('/trakt/sync/recommendations');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const postRecommendation = createAsyncThunk(
  'profile/recommendation/recommend',
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
  'profile/recommendation/unrecommend',
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

const { reducer } = createSlice({
  extraReducers: {
    [fetchRecommendations.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: [],
  name: 'profile/recommendations',
  reducers: {},
});

export { fetchRecommendations, postRecommendation, removeRecommendation };
export default reducer;
