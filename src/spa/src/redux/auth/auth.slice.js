import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchMe = createAsyncThunk('auth/me/fetch', async function (
  _,
  { rejectWithValue },
) {
  try {
    const response = await axios.get('/auth/me');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchMe.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: {
    accessToken: null,
    refreshToken: null,
    slug: null,
    uuid: null,
  },
  name: 'movie',
  reducers: {},
});

export { fetchMe };
export default reducer;
