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

export { fetchRecommendations };
export default reducer;
