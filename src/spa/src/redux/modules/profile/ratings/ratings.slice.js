import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchRatings = createAsyncThunk('profile/ratings/fetch', async function (
  type,
  { rejectWithValue },
) {
  try {
    const response = await axios.get('/trakt/sync/ratings');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchRatings.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: [],
  name: 'profile/ratings',
  reducers: {},
});

export { fetchRatings };
export default reducer;
